import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { siteText } from "@/content/site";
import { localePath } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import type { NavLink } from "@/types/content";

interface PageHeaderProps {
  title: string;
  /** Parent pages above this one, as locale-free paths; the header links back to the nearest one (the home page when empty). */
  parents?: NavLink[];
  /** A shorter band with a smaller title, for long document pages. */
  compact?: boolean;
}

/** The navy title band at the top of public pages, in the home hero's style: a link back to the page above, then the title set light and large. */
export async function PageHeader({ title, parents = [], compact = false }: PageHeaderProps) {
  const locale = await getLocale();
  const { chrome } = siteText[locale];
  const back: NavLink = parents.at(-1) ?? { href: "/", label: chrome.home };

  return (
    <div className="relative isolate overflow-hidden bg-ink-dark text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="container-site h-full">
          <div className="cv-columns h-full border-x border-white/[0.04]" />
        </div>
      </div>
      <div className={`container-site ${compact ? "py-10 sm:py-12" : "py-14 sm:py-20"}`}>
        <nav aria-label={chrome.breadcrumb}>
          <Link
            href={localePath(locale, back.href)}
            className="group inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            <ArrowRight aria-hidden="true" className="size-4 text-gold transition-transform ltr:rotate-180 rtl:group-hover:translate-x-0.5 ltr:group-hover:-translate-x-0.5" />
            {back.label}
          </Link>
        </nav>
        <h1 className={`max-w-4xl font-display font-light text-balance ${compact ? "mt-4 text-3xl leading-snug md:text-4xl md:leading-snug" : "mt-5 text-4xl leading-tight md:text-6xl md:leading-tight"}`}>{title}</h1>
        <span aria-hidden="true" className={`block size-1.5 rounded-full bg-gold ${compact ? "mt-5" : "mt-7"}`} />
      </div>
    </div>
  );
}
