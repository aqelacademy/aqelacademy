import type { Metadata } from "next";
import { CoursePath } from "@/components/courses/course-path";
import { NavySection } from "@/components/ui/navy-section";
import { PageHeader } from "@/components/ui/page-header";
import { courseCopy, getCourses } from "@/content/courses";
import { getLocale } from "@/lib/locale";
import { languageAlternates } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: courseCopy[locale].listTitle, alternates: languageAlternates(locale, "/courses") };
}

export default async function CoursesPage() {
  const locale = await getLocale();
  const copy = courseCopy[locale];

  return (
    <>
      <PageHeader title={copy.listTitle} intro={copy.listIntro} />
      <NavySection>
        <CoursePath locale={locale} courses={getCourses(locale)} />
      </NavySection>
    </>
  );
}
