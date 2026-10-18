import { ArrowLeft } from "lucide-react";
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
 * The home page's courses as a numbered index rather than cards (every course shares the QABA logo, so pictures
 * added nothing). Each row is one link; on hover a soft panel rises behind it and its arrow fills navy.
 */
export function CourseIndex({ locale, courses }: CourseIndexProps) {
  return (
    <ol className="cv-stagger border-t border-ink/15">
      {courses.map((course, index) => {
        const facts = [course.durationWeeks && courseDurationLabel(course.durationWeeks, locale), courseHoursLabel(course.trainingHours, locale)].filter(Boolean).join(" · ");

        return (
          <li key={course.slug} style={order(index)}>
            <Link
              href={localePath(locale, `/courses/${course.slug}`)}
              className="group relative isolate grid grid-cols-[2.5rem_1fr] items-center gap-x-4 gap-y-3 border-b border-ink/15 py-8 before:absolute before:inset-y-0 before:-inset-x-4 before:-z-10 before:origin-bottom before:scale-y-0 before:bg-canvas before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.22,1,0.36,1)] hover:before:scale-y-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:grid-cols-[4rem_1fr_auto_auto] sm:gap-x-8 sm:py-10"
            >
              <span className="self-start pt-1 font-display text-lg text-gold-dark tabular-nums sm:text-xl">{String(index + 1).padStart(2, "0")}</span>
              <span>
                <span className="block font-display text-2xl leading-snug font-semibold text-ink sm:text-3xl sm:leading-snug">{course.title}</span>
                <span className="mt-2 line-clamp-2 block max-w-2xl text-sm leading-relaxed">{course.excerpt}</span>
                <span className="mt-3 block text-sm font-bold text-ink/70">{facts}</span>
              </span>
              <span className="col-start-2 font-display text-2xl font-semibold text-ink tabular-nums sm:col-start-auto sm:text-3xl">{formatPrice(course.priceUsd)}</span>
              <span className="flex size-12 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white max-sm:hidden">
                <ArrowLeft aria-hidden="true" className="size-5 transition-transform duration-300 ltr:rotate-180 rtl:group-hover:-translate-x-0.5 ltr:group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
