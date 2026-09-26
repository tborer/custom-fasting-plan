import Head from "next/head";
import HelpLink from "@/components/HelpLink";

type LegalPageProps = {
  title: string;
  description: string;
  path: "/privacy" | "/terms";
  children: React.ReactNode;
};

export default function LegalPage({ title, description, path, children }: LegalPageProps) {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://custom-fasting-plan.vercel.app").replace(/\/$/, "");

  return (
    <>
      <Head>
        <title>{`${title} | Custom Fasting Plan`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${siteUrl}${path}`} />
      </Head>

      <div className="bg-background min-h-screen flex flex-col">
        <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-16 sm:py-20">
          <h1 className="text-3xl sm:text-4xl font-semibold text-primary">{title}</h1>
          <p className="mt-3 text-muted-foreground">{description}</p>
          <div className="mt-8">{children}</div>
        </main>

        <footer className="border-t mt-auto">
          <div className="mx-auto max-w-4xl px-4 py-8 text-sm text-muted-foreground text-center">
            <p>© 2025 Custom Fasting Plan by Agile Rant. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <a href="/" className="hover:text-primary">Home</a>
              <a href="/blog" className="hover:text-primary">Blog</a>
              <a href="/faq" className="hover:text-primary">FAQ</a>
              <a href="/about" className="hover:text-primary">About</a>
              <a href="/privacy" className="hover:text-primary">Privacy Policy</a>
              <a href="/terms" className="hover:text-primary">Terms of Service</a>
              <HelpLink page={title} />
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
