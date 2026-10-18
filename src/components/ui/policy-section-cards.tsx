import { cardClassName } from "@/components/ui/card";
import { renderInline } from "@/components/ui/rich-text";
import type { PolicySection } from "@/types/content";

interface PolicySectionCardsProps {
  sections: PolicySection[];
  /** Columns, spacing and body text size for this use. */
  className: string;
}

/** One card per policy clause (the refund policy on the home page and its own page). */
export function PolicySectionCards({ sections, className }: PolicySectionCardsProps) {
  return (
    <div className={`grid gap-6 ${className}`}>
      {sections.map(({ title, text, items }) => (
        <article key={title} className={`${cardClassName} p-6 sm:p-7`}>
          <span aria-hidden="true" className="block size-1.5 rounded-full bg-gold" />
          <h3 className="mt-4 text-lg font-bold leading-snug text-ink">{title}</h3>
          {text && <p className="mt-3 leading-relaxed">{text}</p>}
          {items && (
            <ul className="mt-3 list-disc space-y-2 ps-5 leading-relaxed marker:text-gold">
              {items.map((item) => (
                <li key={item} className="break-words">
                  {renderInline(item)}
                </li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </div>
  );
}
