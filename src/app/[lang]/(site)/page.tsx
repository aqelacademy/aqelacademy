import type { Metadata } from "next";
import { ArrowLink } from "@/components/home/arrow-link";
import { ArticleSpread } from "@/components/home/article-spread";
import { CourseIndex } from "@/components/home/course-index";
import { HomeClosing } from "@/components/home/home-closing";
import { HomeHero } from "@/components/home/home-hero";
import { HomePillars } from "@/components/home/home-pillars";
import { HomeSectionHeading } from "@/components/home/home-section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
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
      <HomeHero locale={locale} hero={hero} facts={facts} accreditations={{ title: accreditationsTitle, badges: accreditations }} />

      <section className="container-site py-20 sm:py-28">
        <Reveal>
          <HomeSectionHeading index="01" kicker={featuredSection.kicker} title={featuredSection.title}>
            <p className="max-w-md leading-relaxed">{courseCopy[locale].listIntro}</p>
            <ArrowLink link={localeLink(locale, featuredSection.action)} />
          </HomeSectionHeading>
          <CourseIndex locale={locale} courses={courses.slice(0, 3)} />
        </Reveal>
      </section>

      <section className="border-y border-gold/25 bg-gold-soft py-20 sm:py-28">
        <Reveal className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <HomeSectionHeading index="02" kicker={journey.kicker} title={journey.title} />
            <p className="text-lg leading-loose">{journey.text}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={localeLink(locale, journey.primaryAction).href}>{journey.primaryAction.label}</ButtonLink>
              <ButtonLink href={localeLink(locale, journey.secondaryAction).href} variant="outline">
                {journey.secondaryAction.label}
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-7">
            <HomePillars points={journey.points} />
          </div>
        </Reveal>
      </section>

      <section className="container-site py-20 sm:py-28">
        <Reveal>
          <HomeSectionHeading index="03" kicker={articlesSection.kicker} title={articlesSection.title}>
            <ArrowLink link={localeLink(locale, articlesSection.action)} />
          </HomeSectionHeading>
          <ArticleSpread locale={locale} articles={getArticles(locale).slice(0, 3)} />
        </Reveal>
      </section>

      <HomeClosing title={cta.title} text={cta.text} primaryAction={localeLink(locale, cta.primaryAction)} secondaryAction={localeLink(locale, cta.secondaryAction)} />
    </>
  );
}
