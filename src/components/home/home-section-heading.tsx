import type { ReactNode } from "react";

interface HomeSectionHeadingProps {
  /** The section's place on the page, "01". */
  index: string;
  kicker: string;
  title: string;
  /** Sits at the end side on large screens: an intro line, a link. */
  children?: ReactNode;
  /** On navy sections the title turns white. */
  dark?: boolean;
}

/** The home page's numbered section opening: index and kicker on a gold rule, then the title in the display face. Without children it sits close to the text that follows. */
export function HomeSectionHeading({ index, kicker, title, children, dark = false }: HomeSectionHeadingProps) {
  return (
    <div className={`grid gap-6 lg:grid-cols-12 lg:items-end ${children ? "mb-12 sm:mb-16" : "mb-6"}`}>
      <div className={children ? "lg:col-span-7" : "lg:col-span-12"}>
        <p className={`flex items-center gap-3 text-sm font-bold ${dark ? "text-gold" : "text-gold-dark"}`}>
          <span className="font-display text-base tabular-nums">{index}</span>
          <span aria-hidden="true" className="h-px w-10 bg-gold" />
          {kicker}
        </p>
        <h2 className={`mt-4 font-display text-4xl leading-tight font-semibold sm:text-5xl sm:leading-tight ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      </div>
      {children && <div className="flex flex-col items-start gap-5 lg:col-span-5 lg:items-end lg:text-end">{children}</div>}
    </div>
  );
}
