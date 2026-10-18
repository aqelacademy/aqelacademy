import { ArrowLink } from "@/components/ui/arrow-link";
import { localeLink } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import type { NavLink } from "@/types/content";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  /** A locale-free link; the heading adds the /en prefix. */
  action?: NavLink;
}

/** A section title on inner pages, in the home page's voice: a gold dot, the title in bold, an optional intro and link. */
export async function SectionHeading({ title, subtitle, action }: SectionHeadingProps) {
  const locale = await getLocale();

  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <span aria-hidden="true" className="block size-1.5 rounded-full bg-gold" />
        <h2 className="mt-4 text-2xl leading-snug font-bold text-ink md:text-4xl md:leading-snug">{title}</h2>
        {subtitle && <p className="mt-3 max-w-2xl leading-relaxed">{subtitle}</p>}
      </div>
      {action && <ArrowLink link={localeLink(locale, action)} />}
    </div>
  );
}
