import { ChapterHeading } from "@/components/profile/chapter-heading";
import { order } from "@/components/profile/order";
import { Reveal } from "@/components/ui/reveal";
import type { Chapter } from "@/content/doctor-profile";

interface StrengthsChapterProps {
  chapter: Chapter;
  items: string[];
}

/** 08: the strengths as a numbered list; each rule draws itself in from the start side as the list arrives. */
export function StrengthsChapter({ chapter, items }: StrengthsChapterProps) {
  return (
    <section id={chapter.id} className="py-20 sm:py-24 lg:py-32">
      <div className="container-site grid gap-6 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <ChapterHeading index={8} kicker={chapter.kicker} title={chapter.title} />
        </Reveal>
        <Reveal className="lg:col-span-8">
          <ol className="cv-stagger">
            {items.map((item, index) => (
              <li key={item} style={order(index)} className="relative flex gap-5 py-5 sm:gap-10 sm:py-7">
                <span aria-hidden="true" className="cv-rule absolute inset-x-0 top-0 h-px bg-ink/15" />
                <span className="w-7 shrink-0 font-heading text-xl font-bold sm:w-8 sm:text-2xl text-gold-dark tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-lg font-bold leading-relaxed text-ink sm:text-xl sm:leading-relaxed">{item}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
