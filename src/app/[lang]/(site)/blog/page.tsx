import type { Metadata } from "next";
import { ArticleShowcase } from "@/components/blog/article-showcase";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { articleCopy, getArticles } from "@/content/articles";
import { getLocale } from "@/lib/locale";
import { languageAlternates } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: articleCopy[locale].listTitle, alternates: languageAlternates(locale, "/blog") };
}

export default async function BlogPage() {
  const locale = await getLocale();

  return (
    <>
      <PageHeader title={articleCopy[locale].listTitle} />
      <section className="bg-canvas py-20 sm:py-28">
        <Reveal className="container-site">
          <ArticleShowcase locale={locale} articles={getArticles(locale)} />
        </Reveal>
      </section>
    </>
  );
}
