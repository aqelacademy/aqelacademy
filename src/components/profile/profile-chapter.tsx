import { ChapterHeading } from "@/components/profile/chapter-heading";
import { DisciplinesVenn } from "@/components/profile/disciplines-venn";
import { ScrollWords } from "@/components/profile/scroll-words";
import { Reveal } from "@/components/ui/reveal";
import type { Chapter, Disciplines } from "@/content/doctor-profile";

interface ProfileChapterProps {
  chapter: Chapter;
  intro: string;
  disciplines: Disciplines;
}

/** 01: the statement read word by word, then the three disciplines coming together. */
export function ProfileChapter({ chapter, intro, disciplines }: ProfileChapterProps) {
  return (
    <section id={chapter.id} className="overflow-x-clip py-24 lg:py-32">
      <div className="container-site">
        <Reveal>
          <ChapterHeading index={1} kicker={chapter.kicker} title={chapter.title} />
        </Reveal>
        <ScrollWords text={intro} />

        <div className="mt-20 grid items-center gap-14 border-t border-line pt-20 lg:mt-28 lg:grid-cols-2 lg:gap-20 lg:pt-28">
          <Reveal>
            <h3 className="font-heading text-2xl font-bold leading-snug text-ink md:text-3xl md:leading-snug">{disciplines.title}</h3>
            <span aria-hidden="true" className="mt-4 block h-0.5 w-12 bg-gold" />
            <p className="mt-6 max-w-xl text-lg leading-loose">{disciplines.text}</p>
          </Reveal>
          <DisciplinesVenn fields={disciplines.fields} centre={disciplines.centre} />
        </div>
      </div>
    </section>
  );
}
