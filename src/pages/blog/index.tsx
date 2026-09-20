import Head from "next/head";
import Header from "@/components/Header";

const posts = [
  {
    slug: "beginners-guide",
    title: "The Ultimate Beginner's Guide to Intermittent Fasting",
    description:
      "New to IF? Learn what intermittent fasting is, why it beats traditional diets, and exactly how to start your first 30 days.",
  },
  {
    slug: "science-of-fasting",
    title: "The Science of Fasting for Fat Loss",
    description:
      "How intermittent fasting works on a cellular and metabolic level — insulin, growth hormone, autophagy, and the research behind it.",
  },
];

export default function BlogIndexPage() {
  const currentUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const pageUrl = `${currentUrl}/blog`;
  const title = "Blog | Intermittent Fasting Guides & Research";
  const description = "Guides and science-backed articles on intermittent fasting, fat loss, and metabolic health.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
      </Head>

      <div className="bg-background min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 mx-auto max-w-3xl px-4 py-10 sm:py-16 w-full">
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-primary">Fasting Guides & Research</h1>
            <p className="mt-4 text-lg text-muted-foreground">Practical guides and science-backed articles to help you fast smarter.</p>
          </div>

          <div className="space-y-6">
            {posts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block rounded-lg border bg-card p-6 hover:border-primary/30 transition-colors"
              >
                <h2 className="text-xl font-medium text-primary mb-2">{post.title}</h2>
                <p className="text-sm text-muted-foreground">{post.description}</p>
              </a>
            ))}
          </div>
        </main>

        <footer className="border-t mt-auto">
          <div className="mx-auto max-w-3xl px-4 py-8 text-sm text-muted-foreground text-center">
            <p>&copy; 2025 Custom Fasting Plan by Agile Rant. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-4">
              <a href="/faq" className="hover:text-primary">FAQ</a>
              <a href="/about" className="hover:text-primary">About</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
