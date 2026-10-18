import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { order } from "@/components/profile/order";
import { courseDurationLabel, courseHoursLabel } from "@/content/courses";
import { formatPrice } from "@/lib/format";
import { localePath, type Locale } from "@/lib/i18n";
import type { Course } from "@/types/content";

interface CourseIndexProps {
  locale: Locale;
  courses: Course[];
}

/**
 * The home page's courses on navy, as a numbered index with each course's seal in a white medallion. Inside a
 * Reveal, each row arrives in turn: a gold rule draws across from the reading edge, the seal settles, then the text
 * rises (`.home-row-*` in globals.css). On hover a faint panel rises behind the row and its arrow turns gold.
 */
export function CourseIndex({ locale, courses }: CourseIndexProps) {
  return (
    <ol>
      {courses.map((course, index) => {
        const facts = [course.durationWeeks && courseDurationLabel(course.durationWeeks, locale), courseHoursLabel(course.trainingHours, locale)].filter(Boolean).join(" · ");

        return (
          <li key={course.slug} style={order(index)} className="relative">
            <span aria-hidden="true" className="home-row-rule absolute inset-x-0 top-0 h-px bg-gold/35" />
            <Link
              href={localePath(locale, `/courses/${course.slug}`)}
              className="group relative isolate grid grid-cols-[3.5rem_1fr] items-center gap-x-4 gap-y-3 py-8 before:absolute before:inset-y-0 before:-inset-x-4 before:-z-10 before:origin-bottom before:scale-y-0 before:bg-white/[0.04] before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.22,1,0.36,1)] hover:before:scale-y-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:grid-cols-[2.5rem_5rem_1fr_auto_auto] sm:gap-x-8 sm:py-10"
            >
              <span className="home-row-body self-start pt-1 font-display text-lg text-gold tabular-nums max-sm:hidden">{String(index + 1).padStart(2, "0")}</span>
              <span className="home-row-seal relative size-14 self-start overflow-hidden rounded-full bg-white ring-1 ring-gold/60 ring-offset-4 ring-offset-ink-dark sm:size-20">
                <Image src={course.image.src} alt="" fill sizes="80px" className="scale-[1.15] object-cover" />
              </span>
              <span className="home-row-body">
                <span className="block font-display text-xl leading-snug font-medium text-white sm:text-3xl sm:leading-snug">{course.title}</span>
                <span className="mt-2 line-clamp-2 block max-w-2xl text-sm leading-relaxed text-white/65">{course.excerpt}</span>
                <span className="mt-3 block text-sm font-bold text-white/60">{facts}</span>
              </span>
              <span className="home-row-body col-start-2 font-display text-2xl font-light text-white tabular-nums sm:col-start-auto sm:text-4xl">{formatPrice(course.priceUsd)}</span>
              <span className="home-row-body flex size-12 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-ink max-sm:hidden">
                <ArrowLeft aria-hidden="true" className="size-5 transition-transform duration-300 ltr:rotate-180 rtl:group-hover:-translate-x-0.5 ltr:group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        );
      })}
      <li aria-hidden="true" style={order(courses.length)} className="relative">
        <span className="home-row-rule absolute inset-x-0 top-0 h-px bg-gold/35" />
      </li>
    </ol>
  );
}
