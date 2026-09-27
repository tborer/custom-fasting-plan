import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  return (
    <>
      <Head>
        <title>Something went wrong | Custom Fasting Plan</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-semibold text-primary">Sorry, something went wrong</h1>
        <p className="text-muted-foreground max-w-md">Please try again. If the problem continues, use the Contact link in the footer.</p>
        <Link href="/">
          <Button>Back to home</Button>
        </Link>
      </main>
    </>
  );
}
