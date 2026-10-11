import type { Metadata } from "next";
import { CtaBand } from "@/components/home/cta-band";
import { BooksChapter } from "@/components/profile/books-chapter";
import { CareerChapter } from "@/components/profile/career-chapter";
import { ChapterRail } from "@/components/profile/chapter-rail";
import { ConferencesChapter } from "@/components/profile/conferences-chapter";
import { ProfileChapter } from "@/components/profile/profile-chapter";
import { ProfileCover } from "@/components/profile/profile-cover";
import { ProfileStats } from "@/components/profile/profile-stats";
import { QualificationsChapter } from "@/components/profile/qualifications-chapter";
import { StrengthsChapter } from "@/components/profile/strengths-chapter";
import { TeachingChapter } from "@/components/profile/teaching-chapter";
import { ToolsChapter } from "@/components/profile/tools-chapter";
import { Reveal } from "@/components/ui/reveal";
import { aboutContent } from "@/content/about";
import { doctorProfile, doctorProfilePath } from "@/content/doctor-profile";
import { siteText } from "@/content/site";
import { localeLink, localePath } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { baseOpenGraph, languageAlternates } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { metaTitle, metaDescription, cover } = doctorProfile[locale];
  const { src } = cover.image;
  return {
    title: metaTitle,
    description: metaDescription,
    alternates: languageAlternates(locale, doctorProfilePath),
    openGraph: {
      ...baseOpenGraph(locale),
      type: "profile",
      title: metaTitle,
      description: metaDescription,
      images: [{ url: src.src, width: src.width, height: src.height, alt: cover.image.alt }],
    },
  };
}

/** The doctor's CV, set as a long editorial page. */
export default async function DoctorProfilePage() {
  const locale = await getLocale();
  const profile = doctorProfile[locale];
  const { chapters, closing } = profile;
  const railChapters = Object.values(chapters).map(({ id, label }) => ({ id, label }));

  return (
    <div className="cv-page">
      <div aria-hidden="true" className="sticky top-[4.1875rem] z-30 h-0">
        <div className="cv-reading h-0.5 bg-gold" />
      </div>
      <ChapterRail chapters={railChapters} label={profile.chaptersLabel} />
      <ProfileCover
        {...profile.cover}
        firstChapterId={chapters.profile.id}
        back={{ href: localePath(locale, "/about-us"), label: aboutContent[locale].title }}
        breadcrumbLabel={siteText[locale].chrome.breadcrumb}
      />
      <ProfileStats stats={profile.stats} />
      <ProfileChapter chapter={chapters.profile} intro={profile.intro} disciplines={profile.disciplines} />
      <QualificationsChapter chapter={chapters.qualifications} education={profile.education} licences={profile.licences} />
      <CareerChapter chapter={chapters.career} {...profile.career} />
      <TeachingChapter chapter={chapters.teaching} {...profile.teaching} />
      <ToolsChapter chapter={chapters.tools} {...profile.tools} />
      <ConferencesChapter chapter={chapters.conferences} {...profile.conferences} />
      <BooksChapter chapter={chapters.books} {...profile.books} />
      <StrengthsChapter chapter={chapters.strengths} items={profile.strengths.items} />
      <Reveal>
        <CtaBand title={closing.title} text={closing.text} primaryAction={localeLink(locale, closing.primaryAction)} secondaryAction={localeLink(locale, closing.secondaryAction)} image={closing.image} />
      </Reveal>
    </div>
  );
}
