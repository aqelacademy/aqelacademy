import Image from "next/image";
import Link from "next/link";
import { PillArrow } from "@/components/ui/pill-arrow";
import { order } from "@/components/profile/order";
import { courseCopy, courseDurationLabel } from "@/content/courses";
import { formatCourseLevel, formatPrice } from "@/lib/format";
import { localePath, type Locale } from "@/lib/i18n";
import type { Course } from "@/types/content";

interface CoursePathProps {
  locale: Locale;
  courses: Course[];
}

/**
 * The courses on navy (home, courses, course fees): the seal, the level and step number, the title, then hours and
 * fee in large numerals, and the hero's pill to the course. Inside a Reveal the cards climb in one after another
 * (`.home-step`). On large screens they start as rising stairs and settle level as the list scrolls into view
 * (`.course-stairs`, a CSS view timeline on the inner card). The title is the card's one link and stretches over it.
 */
export function CoursePath({ locale, courses }: CoursePathProps) {
  const copy = courseCopy[locale];

  return (
    <ol className="course-stairs grid gap-5 lg:grid-cols-3 lg:gap-6">
      {courses.map((course, index) => (
        <li key={course.slug} style={order(index)} className="home-step">
          <article className="group relative isolate flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors duration-500 hover:border-gold/40 hover:bg-white/[0.07] sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <span className="relative size-14 overflow-hidden rounded-full bg-white ring-1 ring-gold/60 ring-offset-4 ring-offset-ink-dark">
                <Image src={course.image.src} alt="" fill sizes="56px" className="scale-[1.15] object-cover" />
              </span>
              <span className="flex items-center gap-3">
                <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/80">{formatCourseLevel(course.level, locale)}</span>
                <span aria-hidden="true" className="text-lg font-bold text-gold tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </span>
            </div>
            <h3 className="mt-10 text-xl leading-snug font-bold text-white sm:text-2xl sm:leading-snug">
              <Link href={localePath(locale, `/courses/${course.slug}`)} className="after:absolute after:inset-0 focus-visible:outline-none after:rounded-3xl focus-visible:after:outline-2 focus-visible:after:outline-gold">
                {course.title}
              </Link>
            </h3>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/60">{course.excerpt}</p>
            <dl className="mt-8 grid grid-cols-2 border-y border-white/10 py-5">
              <div>
                <dt className="text-xs text-white/55">{copy.hours}</dt>
                <dd className="mt-1 text-3xl font-bold text-white tabular-nums">{course.trainingHours}</dd>
              </div>
              <div className="border-s border-white/10 ps-5">
                <dt className="text-xs text-white/55">{copy.fee}</dt>
                <dd className="mt-1 text-3xl font-bold text-white tabular-nums">{formatPrice(course.priceUsd)}</dd>
              </div>
            </dl>
            <div className="mt-6 flex items-center justify-between gap-4">
              <span className="text-xs text-white/55">{course.durationWeeks ? courseDurationLabel(course.durationWeeks, locale) : ""}</span>
              <span aria-hidden="true" className="inline-flex items-center gap-3 rounded-full border border-white/25 py-1.5 ps-5 pe-1.5 text-sm font-bold text-white transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-ink">
                {copy.details}
                <PillArrow className="size-8 bg-white/10 text-white group-hover:bg-ink" />
              </span>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
