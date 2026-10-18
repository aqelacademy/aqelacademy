import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { siteText } from "@/content/site";
import { localePath } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import type { NavLink } from "@/types/content";

interface PageHeaderProps {
  title: string;
  /** Parent pages above this one, as locale-free paths; nested pages link back to the nearest one. Top-level pages have none and show no back link. */
  parents?: NavLink[];
  /** A line under the title. */
  intro?: string;
}

/** The plain opening of an inner page, aligned with its content: a back link on nested pages, a gold dot, the title and an optional intro. */
export async function PageHeader({ title, parents = [], intro }: PageHeaderProps) {
  const locale = await getLocale();
  const { chrome } = siteText[locale];
  const back = parents.at(-1);

  return (
    <div className="border-b border-line bg-white">
      <div className="container-site pt-10 pb-10 sm:pt-14 sm:pb-12">
        {back ? (
          <nav aria-label={chrome.breadcrumb} className="mb-6">
            <Link href={localePath(locale, back.href)} className="group inline-flex items-center gap-2 text-sm font-bold text-body transition-colors hover:text-ink">
              <ArrowRight aria-hidden="true" className="size-4 text-gold transition-transform ltr:rotate-180 rtl:group-hover:translate-x-0.5 ltr:group-hover:-translate-x-0.5" />
              {back.label}
            </Link>
          </nav>
        ) : (
          <span aria-hidden="true" className="mb-5 block size-1.5 rounded-full bg-gold" />
        )}
        <h1 className="max-w-3xl text-3xl leading-snug font-bold text-balance text-ink sm:text-4xl sm:leading-snug">{title}</h1>
        {intro && <p className="mt-4 max-w-3xl text-lg leading-loose">{intro}</p>}
      </div>
    </div>
  );
}
