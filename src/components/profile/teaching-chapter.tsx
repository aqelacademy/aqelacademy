import { ChapterHeading } from "@/components/profile/chapter-heading";
import { order } from "@/components/profile/order";
import { Reveal } from "@/components/ui/reveal";
import type { Chapter } from "@/content/doctor-profile";

interface TeachingChapterProps {
  chapter: Chapter;
  text: string;
  items: string[];
}

/** 04: a navy band with the courses he has taught as a numbered index; "100+" sits faintly behind it. */
export function TeachingChapter({ chapter, text, items }: TeachingChapterProps) {
  return (
    <section id={chapter.id} className="relative isolate overflow-hidden bg-ink-dark py-20 sm:py-24 lg:py-32">
      <p aria-hidden="true" className="absolute -top-10 -end-6 -z-10 font-heading text-[11rem] leading-none font-bold text-white/[0.035] sm:text-[18rem] lg:-top-16 lg:text-[24rem]">
        100+
      </p>
      <div className="container-site">
        <Reveal>
          <ChapterHeading index={4} kicker={chapter.kicker} title={chapter.title} text={text} tone="dark" />
        </Reveal>
        <Reveal>
          <ol className="cv-stagger grid gap-x-12 sm:grid-cols-2">
            {items.map((item, index) => (
              <li key={item} style={order(index % 8)} className="group flex items-baseline gap-5 border-t border-white/10 py-5">
                <span className="w-7 shrink-0 font-heading text-sm font-bold text-gold tabular-nums transition-transform duration-300 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-lg leading-relaxed text-white/85 transition-colors duration-300 group-hover:text-white">{item}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
