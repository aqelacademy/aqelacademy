import type { Metadata } from "next";
import { ArticleGrid } from "@/components/blog/article-grid";
import { CourseGrid } from "@/components/courses/course-grid";
import { CtaBand } from "@/components/home/cta-band";
import { HomeFacts } from "@/components/home/home-facts";
import { HomeHero } from "@/components/home/home-hero";
import { ButtonLink } from "@/components/ui/button-link";
import { CheckList } from "@/components/ui/check-list";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getArticles } from "@/content/articles";
import { courseCopy, getCourses } from "@/content/courses";
import { homeContent } from "@/content/home";
import { localeLink } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { languageAlternates } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return { alternates: languageAlternates(await getLocale(), "/") };
}

export default async function HomePage() {
  const locale = await getLocale();
  const { hero, stats, accreditationsTitle, accreditations, featuredCourses: featuredSection, latestArticles: articlesSection, journey, cta } = homeContent[locale];
  const courses = getCourses(locale);
  const facts = [
    { value: stats.years, suffix: "+", label: stats.yearsLabel },
    { value: courses.length, label: stats.programmesLabel },
  ];

  return (
    <>
      <HomeHero locale={locale} hero={hero}>
        <HomeFacts facts={facts} accreditationsTitle={accreditationsTitle} accreditations={accreditations} />
      </HomeHero>

      <section className="container-site py-20">
        <Reveal>
          <SectionHeading title={featuredSection.title} subtitle={courseCopy[locale].listIntro} action={featuredSection.action} />
          <CourseGrid courses={courses.slice(0, 3)} />
        </Reveal>
      </section>

      <section className="border-y border-line bg-canvas py-20">
        <Reveal className="container-site">
          <div>
            <SectionHeading title={journey.title} />
            <p className="text-lg leading-loose">{journey.text}</p>
            <div className="mt-8 font-bold text-ink">
              <CheckList items={journey.points} />
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={localeLink(locale, journey.primaryAction).href}>{journey.primaryAction.label}</ButtonLink>
              <ButtonLink href={localeLink(locale, journey.secondaryAction).href} variant="outline">
                {journey.secondaryAction.label}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="container-site py-20">
        <Reveal>
          <SectionHeading title={articlesSection.title} action={articlesSection.action} />
          <ArticleGrid articles={getArticles(locale).slice(0, 3)} />
        </Reveal>
      </section>

      <Reveal>
        <CtaBand title={cta.title} text={cta.text} primaryAction={localeLink(locale, cta.primaryAction)} secondaryAction={localeLink(locale, cta.secondaryAction)} />
      </Reveal>
    </>
  );
}
