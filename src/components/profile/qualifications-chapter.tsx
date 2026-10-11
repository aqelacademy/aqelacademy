import { ChapterHeading } from "@/components/profile/chapter-heading";
import { order } from "@/components/profile/order";
import { Reveal } from "@/components/ui/reveal";
import type { Chapter, Degree, Licence } from "@/content/doctor-profile";

interface QualificationsChapterProps {
  chapter: Chapter;
  education: { title: string; steps: Degree[] };
  licences: { title: string; numberLabel: string; items: Licence[] };
}

function SubHeading({ children }: { children: string }) {
  return <h3 className="mb-10 text-sm font-bold text-ink ltr:tracking-wide">{children}</h3>;
}

/** 02: the four degrees as a rising staircase (a diagonal list on phones), then the licences as a register. */
export function QualificationsChapter({ chapter, education, licences }: QualificationsChapterProps) {
  const lastStep = education.steps.length - 1;

  return (
    <section id={chapter.id} className="border-y border-line bg-canvas py-20 sm:py-24 lg:py-32">
      <div className="container-site">
        <Reveal>
          <ChapterHeading index={2} kicker={chapter.kicker} title={chapter.title} />
        </Reveal>

        <Reveal>
          <SubHeading>{education.title}</SubHeading>
          <ol className="cv-stagger grid gap-8 lg:grid-cols-4 lg:items-end lg:gap-0">
            {education.steps.map((step, index) => (
              <li key={step.year} style={order(index)} className="max-lg:ms-[calc(var(--i)*1.25rem)] max-lg:border-s-2 max-lg:border-gold max-lg:ps-5">
                <div className="lg:pe-6 lg:pb-6">
                  <p className="font-heading text-lg font-bold text-gold-dark tabular-nums">{step.year}</p>
                  <h4 className="mt-2 font-heading text-xl font-bold leading-snug text-ink">{step.title}</h4>
                  <p className="mt-1 text-sm">{step.place}</p>
                </div>
                <div
                  aria-hidden="true"
                  className={`cv-step relative hidden h-[calc(5rem+var(--i)*3.5rem)] overflow-hidden border-t-2 border-gold lg:block ${index === lastStep ? "bg-ink" : "border-e border-e-line bg-white"}`}
                >
                  <span className={`absolute bottom-3 start-5 font-heading text-6xl font-bold tabular-nums ${index === lastStep ? "text-gold" : "text-ink/[0.07]"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="mt-24 lg:mt-32">
          <SubHeading>{licences.title}</SubHeading>
          <ul className="border-t border-line">
            {licences.items.map((licence) => (
              <li
                key={licence.title}
                className="group relative isolate grid gap-x-8 gap-y-2 border-b border-line py-6 before:absolute before:inset-0 before:-z-10 before:scale-x-0 before:bg-white before:transition-transform before:duration-500 before:ease-out hover:before:scale-x-100 ltr:before:origin-left rtl:before:origin-right sm:grid-cols-[5rem_1fr_auto] sm:items-baseline sm:px-4"
              >
                <span className="font-heading text-2xl font-bold text-gold-dark tabular-nums">{licence.year}</span>
                <div>
                  <p className="text-lg font-bold leading-snug text-ink">{licence.title}</p>
                  {licence.issuer && <p className="mt-1 text-sm leading-relaxed">{licence.issuer}</p>}
                </div>
                {licence.number && (
                  <p className="flex items-center gap-2 text-xs">
                    {licences.numberLabel}
                    <span dir="ltr" className="rounded-md border border-gold/60 bg-white px-2.5 py-1 text-sm font-bold text-ink tabular-nums">
                      {licence.number}
                    </span>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
