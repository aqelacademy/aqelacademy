import { ChapterHeading } from "@/components/profile/chapter-heading";
import { Reveal } from "@/components/ui/reveal";
import type { Chapter } from "@/content/doctor-profile";

interface ToolsChapterProps {
  chapter: Chapter;
  text: string;
  rows: [string[], string[]];
}

function ToolList({ items, hidden = false }: { items: string[]; hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0">
      {items.map((item) => (
        <li key={item} className="pe-3">
          <span className="block rounded-full border border-line bg-white px-4 py-2 text-[0.95rem] font-bold whitespace-nowrap text-ink shadow-card sm:px-6 sm:py-3 sm:text-lg">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** 05: the assessments and programmes he trained in, as two rows drifting in opposite directions (paused on hover). */
export function ToolsChapter({ chapter, text, rows }: ToolsChapterProps) {
  return (
    <section id={chapter.id} className="overflow-hidden border-b border-line bg-canvas py-20 sm:py-24 lg:py-32">
      <Reveal className="container-site">
        <ChapterHeading index={5} kicker={chapter.kicker} title={chapter.title} text={text} />
      </Reveal>
      <div className="cv-marquee-rows space-y-4">
        {rows.map((items, index) => (
          <div key={items[0]} className="cv-marquee-row">
            {/* The list twice, so the loop has no seam; the copy is hidden from screen readers. */}
            <div className={`cv-marquee ${index === 1 ? "cv-marquee-reverse" : ""}`}>
              <ToolList items={items} />
              <ToolList items={items} hidden />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
