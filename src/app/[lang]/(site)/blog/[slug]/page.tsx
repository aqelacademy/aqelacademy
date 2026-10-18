import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { RichText } from "@/components/ui/rich-text";
import { articleCopy, articleSlugs, getArticle } from "@/content/articles";
import { formatDate } from "@/lib/format";
import { getLocale } from "@/lib/locale";
import { baseOpenGraph, languageAlternates } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const article = getArticle(slug, locale);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: languageAlternates(locale, `/blog/${slug}`),
    openGraph: { ...baseOpenGraph(locale), type: "article", title: article.title, description: article.excerpt, images: [article.image.src.src] },
  };
}

export default async function ArticlePage({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { slug } = await params;
  const locale = await getLocale();
  const article = getArticle(slug, locale);
  if (!article) notFound();

  return (
    <>
      <PageHeader title={article.title} parents={[{ href: "/blog", label: articleCopy[locale].listTitle }]} />
      <div className="relative isolate">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-32 bg-ink-dark sm:h-48" />
        <div className="container-site">
          <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-[2rem] bg-surface shadow-pop">
            <Image src={article.image.src} alt={article.image.alt} fill sizes="(min-width: 1024px) 64rem, 100vw" preload className="object-cover" />
          </div>
        </div>
      </div>
      <div className="container-site pt-12 pb-20 sm:pb-28">
        <article className="mx-auto max-w-3xl">
          <time dateTime={article.publishedAt} className="inline-flex rounded-full border border-line px-4 py-1.5 text-sm font-bold text-gold-dark">
            {formatDate(article.publishedAt, locale)}
          </time>
          <div className="mt-10">
            <RichText blocks={article.body} />
          </div>
        </article>
      </div>
    </>
  );
}
