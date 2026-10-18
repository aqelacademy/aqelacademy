import Image from "next/image";
import Link from "next/link";
import { order } from "@/components/profile/order";
import { formatDate } from "@/lib/format";
import { localePath, type Locale } from "@/lib/i18n";
import type { Article } from "@/types/content";

interface ArticleSpreadProps {
  locale: Locale;
  /** The first leads the spread; the rest are listed beside it. */
  articles: Article[];
}

interface ArticleLinkProps {
  locale: Locale;
  article: Article;
  featured?: boolean;
}

const underline =
  "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:100%_100%] bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px] ltr:bg-[position:0_100%]";

/** One article: picture, date and title as a single link; its title underlines on hover. */
function ArticleLink({ locale, article, featured = false }: ArticleLinkProps) {
  return (
    <Link href={localePath(locale, `/blog/${article.slug}`)} className={`group grid gap-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${featured ? "" : "grid-cols-[7rem_1fr] items-center sm:grid-cols-[10rem_1fr]"}`}>
      <span className={`relative block overflow-hidden bg-surface ${featured ? "aspect-[16/10]" : "aspect-square sm:aspect-[4/3]"}`}>
        <Image src={article.image.src} alt="" fill sizes={featured ? "(min-width: 1024px) 44rem, 100vw" : "10rem"} className="object-cover" />
      </span>
      <span>
        <time dateTime={article.publishedAt} className="block text-xs font-bold text-gold-dark">
          {formatDate(article.publishedAt, locale)}
        </time>
        <span className={`mt-2 block font-display leading-snug font-semibold text-ink ${featured ? "text-2xl sm:text-3xl sm:leading-snug" : "text-lg sm:text-xl"}`}>
          <span className={underline}>{article.title}</span>
        </span>
        {featured && <span className="mt-3 line-clamp-2 block max-w-2xl leading-relaxed">{article.excerpt}</span>}
      </span>
    </Link>
  );
}

/** The latest articles as a magazine spread: one large on the start side, the others stacked beside it. */
export function ArticleSpread({ locale, articles }: ArticleSpreadProps) {
  const [lead, ...rest] = articles;
  if (!lead) return null;

  return (
    <div className="cv-stagger grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7" style={order(0)}>
        <ArticleLink locale={locale} article={lead} featured />
      </div>
      <ul className="divide-y divide-line border-y border-line lg:col-span-5 lg:self-start" style={order(1)}>
        {rest.map((article) => (
          <li key={article.slug} className="py-6">
            <ArticleLink locale={locale} article={article} />
          </li>
        ))}
      </ul>
    </div>
  );
}
