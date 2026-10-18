import Image from "next/image";
import Link from "next/link";
import { PillArrow } from "@/components/home/pill-arrow";
import { order } from "@/components/profile/order";
import { formatDate } from "@/lib/format";
import { localePath, type Locale } from "@/lib/i18n";
import type { Article } from "@/types/content";

interface ArticleShowcaseProps {
  locale: Locale;
  /** The first leads; the next two sit beside it. */
  articles: Article[];
}

/**
 * The latest articles as full-bleed picture cards, like small heroes: the date on a pill, the title set light over
 * a navy shade, and the hero's round arrow. The first card is tall; the others share the column beside it. Inside
 * a Reveal the cards unveil from the bottom one after another (`.home-unveil`); on hover the picture slowly drifts
 * closer and the arrow turns.
 */
export function ArticleShowcase({ locale, articles }: ArticleShowcaseProps) {
  return (
    <ul className="grid gap-5 lg:grid-cols-12 lg:grid-rows-2 lg:gap-6">
      {articles.map((article, index) => {
        const lead = index === 0;

        return (
          <li key={article.slug} style={order(index)} className={`home-unveil ${lead ? "lg:col-span-7 lg:row-span-2" : "lg:col-span-5"}`}>
            <article className={`group relative isolate flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] bg-ink-dark p-6 text-white sm:p-8 ${lead ? "min-h-[26rem] lg:min-h-[38rem]" : "min-h-[18rem]"}`}>
              <Image
                src={article.image.src}
                alt=""
                fill
                sizes={lead ? "(min-width: 1024px) 44rem, 100vw" : "(min-width: 1024px) 32rem, 100vw"}
                className="-z-20 object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-dark via-ink-dark/60 via-50% to-ink-dark/10" />
              <time dateTime={article.publishedAt} className="self-start rounded-full bg-ink-dark/60 px-3.5 py-1.5 text-xs font-medium">
                {formatDate(article.publishedAt, locale)}
              </time>
              <div className="flex items-end justify-between gap-6">
                <div>
                  <h3 className={`leading-snug font-bold text-balance ${lead ? "text-2xl sm:text-4xl sm:leading-snug" : "text-xl sm:text-2xl"}`}>
                    <Link href={localePath(locale, `/blog/${article.slug}`)} className="after:absolute after:inset-0 after:rounded-[1.75rem] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-gold">
                      {article.title}
                    </Link>
                  </h3>
                  {lead && <p className="mt-3 line-clamp-2 max-w-lg leading-relaxed text-white/75 max-sm:hidden">{article.excerpt}</p>}
                </div>
                <PillArrow className="size-12 border border-white/30 text-white group-hover:border-white group-hover:bg-white group-hover:text-ink" />
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
