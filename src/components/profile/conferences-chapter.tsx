import { FileText, MapPin } from "lucide-react";
import { ChapterHeading } from "@/components/profile/chapter-heading";
import { ScrollProgress } from "@/components/profile/scroll-progress";
import type { Chapter, Conference } from "@/content/doctor-profile";

interface ConferencesChapterProps {
  chapter: Chapter;
  text: string;
  paperLabel: string;
  items: Conference[];
}

/**
 * 06: the papers in date order along a horizontal axis. On large screens the section pins under the header and
 * scrolling down slides the axis sideways; on phones (and with reduced motion) it is a swipeable row.
 */
export function ConferencesChapter({ chapter, text, paperLabel, items }: ConferencesChapterProps) {
  return (
    <section id={chapter.id}>
      <ScrollProgress mode="pin" className="relative lg:motion-safe:h-[280vh]">
        <div className="py-20 sm:py-24 lg:py-32 lg:motion-safe:sticky lg:motion-safe:top-[4.1875rem] lg:motion-safe:flex lg:motion-safe:h-[calc(100svh-4.1875rem)] lg:motion-safe:flex-col lg:motion-safe:justify-center lg:motion-safe:overflow-hidden lg:motion-safe:py-0">
          <div className="container-site">
            <ChapterHeading index={6} kicker={chapter.kicker} title={chapter.title} text={text} />
          </div>
          <div className="relative">
            <div aria-hidden="true" className="absolute inset-x-0 top-5 h-px bg-line" />
            <ol className="cv-pin-track flex snap-x snap-mandatory overflow-x-auto px-[max(1rem,calc((100vw-80rem)/2+1rem))] pb-4 lg:motion-safe:w-max lg:motion-safe:overflow-visible lg:motion-safe:pb-0">
              {items.map((item) => (
                <li key={item.title} className="w-[78vw] max-w-[22rem] shrink-0 snap-start pe-5 sm:w-[22rem]">
                  <p className="flex h-10 items-center gap-4">
                    <span aria-hidden="true" className="size-3 shrink-0 rounded-full bg-gold ring-4 ring-white" />
                    <span className="font-heading text-3xl font-bold text-ink tabular-nums">{item.year}</span>
                  </p>
                  <article className="mt-6 flex h-60 flex-col rounded-xl border border-line bg-white p-6 shadow-card transition-[border-color,box-shadow] duration-300 hover:border-gold/60 hover:shadow-lift">
                    <p className="flex items-center gap-2 text-sm">
                      <MapPin aria-hidden="true" className="size-4 text-gold" />
                      {item.country}
                    </p>
                    <h3 className="mt-4 font-heading text-xl font-bold leading-relaxed text-ink">{item.title}</h3>
                    <p className="mt-auto flex items-center gap-2 pt-4 text-xs font-bold text-gold-dark">
                      <FileText aria-hidden="true" className="size-4" />
                      {paperLabel}
                    </p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </ScrollProgress>
    </section>
  );
}
