import type { AppProps } from 'next/app'
import '../styles/globals.css';
import { Toaster } from "@/components/ui/toaster"
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    // Get the color-scheme value from :root
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    const colorScheme = computedStyle.getPropertyValue('--mode').trim().replace(/"/g, '');
    if (colorScheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add('light');
    }
    setMounted(true);
  }, []);

  // Send GA4 page_view on route changes (SPA)
  useEffect(() => {
    if (!GA_ID) return;

    const handleRouteChange = (url: string) => {
      // @ts-ignore - gtag injected by our inline script
      window.gtag?.('config', GA_ID, { page_path: url });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    // Initial page load
    handleRouteChange(window.location.pathname + window.location.search);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [GA_ID, router.events]);

  // Prevent flash while theme loads
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Google tag (gtag.js) */}
      {GA_ID && (
        <>
          <Script
            id="ga4-script"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script
            id="ga4-inline"
            strategy="afterInteractive"
          >
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = window.gtag || gtag;
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      <Component {...pageProps} />
      <Toaster />
    </div>
  )
}