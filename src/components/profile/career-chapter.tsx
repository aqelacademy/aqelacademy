import type { CSSProperties } from "react";
import { ChapterHeading } from "@/components/profile/chapter-heading";
import { ScrollProgress } from "@/components/profile/scroll-progress";
import { FramedImage } from "@/components/ui/framed-image";
import { Reveal } from "@/components/ui/reveal";
import type { CareerRole, Chapter } from "@/content/doctor-profile";
import type { ContentImage } from "@/types/content";

interface CareerChapterProps {
  chapter: Chapter;
  text: string;
  /** "now", for roles that are still going. */
  present: string;
  image: ContentImage;
  roles: CareerRole[];
}

/**
 * 03: the roles, newest first, on a line that fills with gold as the reader moves down it; each dot lights when
 * the line reaches it. On large screens the heading and a photo stay pinned beside the list.
 */
export function CareerChapter({ chapter, text, present, image, roles }: CareerChapterProps) {
  return (
    <section id={chapter.id} className="py-24 lg:py-32">
      <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <ChapterHeading index={3} kicker={chapter.kicker} title={chapter.title} text={text} />
          <div className="max-w-sm max-lg:hidden">
            <FramedImage image={image} shape="portrait" sizes="24rem" />
          </div>
        </Reveal>

        <ScrollProgress mode="track" className="relative lg:col-span-7">
          <div aria-hidden="true" className="absolute top-2 bottom-2 start-0 w-px bg-line">
            <div className="cv-line h-full w-full bg-gold" />
          </div>
          <ol>
            {roles.map((item, index) => (
              <li key={`${item.start}-${item.place}`} className="relative ps-9 pb-12 last:pb-0 sm:ps-12" style={{ "--at": (index / roles.length).toFixed(3) } as CSSProperties}>
                <span aria-hidden="true" className="cv-dot absolute top-2.5 start-0 size-3 rounded-full border-2 border-gold ltr:-translate-x-1/2 rtl:translate-x-1/2" />
                <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-heading text-lg font-bold text-ink tabular-nums">
                    {item.start} – {item.end ?? <span className="text-gold-dark">{present}</span>}
                  </span>
                  <span className="text-sm">{item.country}</span>
                </p>
                <h3 className="mt-2 text-lg font-bold leading-snug text-ink">{item.role}</h3>
                <p className="mt-1 max-w-xl leading-relaxed">{item.place}</p>
              </li>
            ))}
          </ol>
        </ScrollProgress>
      </div>
    </section>
  );
}
