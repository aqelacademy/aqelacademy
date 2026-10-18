import type { CSSProperties } from "react";
import { ChapterHeading } from "@/components/profile/chapter-heading";
import { Reveal } from "@/components/ui/reveal";
import type { Book, Chapter } from "@/content/doctor-profile";

interface BooksChapterProps {
  chapter: Chapter;
  text: string;
  publishedLabel: string;
  inProgressLabel: string;
  items: Book[];
}

/** Spine heights on the shelf, and how much shorter each book is in the phone pile, so no two look alike. */
const shapes = [
  { height: "23rem", pile: "4%" },
  { height: "20.5rem", pile: "10%" },
  { height: "24rem", pile: "0%" },
  { height: "19rem", pile: "7%" },
  { height: "21.5rem", pile: "13%" },
  { height: "25rem", pile: "3%" },
];

/** 07: the books as spines on a shelf (a stacked pile on phones): navy for published, paper for those in progress. A spine slides up when pointed at. */
export function BooksChapter({ chapter, text, publishedLabel, inProgressLabel, items }: BooksChapterProps) {
  return (
    <section id={chapter.id} className="border-t border-line bg-canvas py-20 sm:py-24 lg:py-32">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-12">
        <Reveal className="lg:col-span-5">
          <ChapterHeading index={7} kicker={chapter.kicker} title={chapter.title} text={text} />
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm lg:mb-4">
            <li className="flex items-center gap-2.5">
              <span aria-hidden="true" className="h-4 w-3 rounded-sm bg-ink" />
              {publishedLabel}
            </li>
            <li className="flex items-center gap-2.5">
              <span aria-hidden="true" className="h-4 w-3 rounded-sm border border-ink/30 bg-white" />
              {inProgressLabel}
            </li>
          </ul>
        </Reveal>

        <Reveal className="lg:col-span-7">
          <ol className="cv-stagger flex flex-col-reverse items-center gap-1 sm:flex-row sm:gap-0 sm:items-end sm:justify-center">
            {items.map((book, index) => {
              const shape = shapes[index % shapes.length];
              return (
                <li
                  key={book.title}
                  style={{ "--i": index, "--h": shape.height, "--pile": shape.pile } as CSSProperties}
                  className="w-[calc(100%-var(--pile))] sm:w-auto sm:px-1"
                >
                  <div
                    className={`relative flex items-center justify-between gap-4 rounded-sm px-5 py-3.5 transition-transform duration-500 ease-out sm:h-[var(--h)] sm:w-14 sm:flex-col sm:px-0 sm:py-7 sm:hover:-translate-y-4 lg:w-16 ${book.published ? "bg-ink text-white shadow-lift" : "border border-ink/15 bg-white text-ink shadow-card"}`}
                  >
                    <span aria-hidden="true" className="absolute inset-y-2 start-2 w-px bg-gold/60 sm:inset-x-2 sm:inset-y-auto sm:top-3 sm:h-px sm:w-auto" />
                    <span aria-hidden="true" className="absolute inset-y-2 end-2 w-px bg-gold/60 sm:inset-x-2 sm:inset-y-auto sm:top-auto sm:bottom-3 sm:h-px sm:w-auto" />
                    <span className="min-h-0 text-sm leading-snug font-bold sm:text-center sm:[writing-mode:vertical-rl]">{book.title}</span>
                    <span className={`shrink-0 text-[0.7rem] font-bold sm:[writing-mode:vertical-rl] ${book.published ? "text-gold" : "text-gold-dark"}`}>
                      {book.published ? publishedLabel : inProgressLabel}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
          <div aria-hidden="true" className="h-2.5 rounded-sm bg-ink/90 shadow-lift max-sm:hidden" />
        </Reveal>
      </div>
    </section>
  );
}
