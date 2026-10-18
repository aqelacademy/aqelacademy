import type { Metadata } from "next";
import { CoursePath } from "@/components/courses/course-path";
import { ArrowLink } from "@/components/ui/arrow-link";
import { NavySection } from "@/components/ui/navy-section";
import { PageHeader } from "@/components/ui/page-header";
import { getCourses } from "@/content/courses";
import { feesCopy } from "@/content/fees";
import { formatDate } from "@/lib/format";
import { localeLink } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { languageAlternates } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: feesCopy[locale].title, alternates: languageAlternates(locale, "/course-fees") };
}

export default async function CourseFeesPage() {
  const locale = await getLocale();
  const copy = feesCopy[locale];
  const courses = getCourses(locale);

  return (
    <>
      <PageHeader title={copy.title} />
      <NavySection>
        <p className="mb-14 text-sm text-white/70 lg:mb-20">
          {copy.lastUpdated} <time dateTime={copy.updatedAt}>{formatDate(copy.updatedAt, locale)}</time>
        </p>
        <CoursePath locale={locale} courses={courses} />
        <p className="mt-14">
          <ArrowLink link={localeLink(locale, { href: "/refund-policy", label: copy.refundLink })} className="text-white" />
        </p>
      </NavySection>
    </>
  );
}
