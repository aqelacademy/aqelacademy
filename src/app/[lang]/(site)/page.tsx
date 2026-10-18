import type { Metadata } from "next";
import { ArrowLink } from "@/components/home/arrow-link";
import { ArticleShowcase } from "@/components/home/article-showcase";
import { CoursePath } from "@/components/home/course-path";
import { HomeApproach } from "@/components/home/home-approach";
import { HomeClosing } from "@/components/home/home-closing";
import { HomeHero } from "@/components/home/home-hero";
import { HomeSectionHeading } from "@/components/home/home-section-heading";
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

      <section className="relative isolate bg-ink-dark py-20 text-white sm:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="container-site h-full">
            <div className="cv-columns h-full border-x border-white/[0.04]" />
          </div>
        </div>
        <Reveal className="container-site">
          <HomeSectionHeading index="01" kicker={featuredSection.kicker} title={featuredSection.title} dark>
            <p className="max-w-md leading-relaxed text-white/70">{courseCopy[locale].listIntro}</p>
            <ArrowLink link={localeLink(locale, featuredSection.action)} className="text-white" />
          </HomeSectionHeading>
          <CoursePath locale={locale} courses={courses.slice(0, 3)} feeLabel={featuredSection.fee} />
        </Reveal>
      </section>

      <HomeApproach
        heading={journey}
        points={journey.points}
        image={journey.image}
        caption={journey.caption}
        actions={[localeLink(locale, journey.primaryAction), localeLink(locale, journey.secondaryAction)]}
      />

      <section className="border-t border-line bg-canvas py-20 sm:py-28">
        <Reveal className="container-site">
          <HomeSectionHeading index="03" kicker={articlesSection.kicker} title={articlesSection.title}>
            <ArrowLink link={localeLink(locale, articlesSection.action)} />
          </HomeSectionHeading>
          <ArticleShowcase locale={locale} articles={getArticles(locale).slice(0, 3)} />
        </Reveal>
      </section>

      <HomeClosing title={cta.title} text={cta.text} primaryAction={localeLink(locale, cta.primaryAction)} secondaryAction={localeLink(locale, cta.secondaryAction)} />
    </>
  );
}
