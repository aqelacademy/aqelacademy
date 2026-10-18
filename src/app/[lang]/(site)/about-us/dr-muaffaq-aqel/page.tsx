import type { Metadata } from "next";
import { CtaBand } from "@/components/home/cta-band";
import { PortfolioBooks } from "@/components/portfolio/portfolio-books";
import { PortfolioCareer } from "@/components/portfolio/portfolio-career";
import { PortfolioCredentials } from "@/components/portfolio/portfolio-credentials";
import { PortfolioExpertise } from "@/components/portfolio/portfolio-expertise";
import { PortfolioHero } from "@/components/portfolio/portfolio-hero";
import { PortfolioNav } from "@/components/portfolio/portfolio-nav";
import { PortfolioSection } from "@/components/portfolio/portfolio-section";
import { PortfolioTalks } from "@/components/portfolio/portfolio-talks";
import { order } from "@/components/profile/order";
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

/** The doctor's portfolio: a hero with his photo and figures, a section bar, then his profile, credentials, career, expertise, papers, books and strengths. */
export default async function DoctorProfilePage() {
  const locale = await getLocale();
  const profile = doctorProfile[locale];
  const { chapters, closing } = profile;
  // Tools are shown inside the teaching section, so the bar skips them.
  const sections = Object.values(chapters)
    .filter(({ id }) => id !== "tools")
    .map(({ id, label }) => ({ id, label }));
  const indexOf = (id: string) => sections.findIndex((section) => section.id === id) + 1;

  return (
    <div className="cv-page">
      <PortfolioHero
        cover={profile.cover}
        stats={profile.stats}
        back={{ href: localePath(locale, "/about-us"), label: aboutContent[locale].title }}
        actions={[localeLink(locale, closing.secondaryAction), localeLink(locale, closing.primaryAction)]}
        breadcrumbLabel={siteText[locale].chrome.breadcrumb}
      />
      <PortfolioNav sections={sections} label={profile.chaptersLabel} />

      <PortfolioSection id={chapters.profile.id} index={indexOf("profile")} kicker={chapters.profile.kicker} title={chapters.profile.title}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <p className="text-lg leading-loose font-semibold text-ink sm:text-2xl sm:leading-loose sm:font-bold lg:col-span-7">{profile.intro}</p>
          <div className="rounded-[2rem] bg-ink-dark p-6 text-white sm:p-8 lg:col-span-5">
            <h3 className="text-2xl font-bold">{profile.disciplines.title}</h3>
            <p className="mt-3 leading-relaxed text-white/75">{profile.disciplines.text}</p>
            <ol className="mt-8 space-y-3">
              {profile.disciplines.fields.map((field, index) => (
                <li key={field} className="flex items-center gap-4 rounded-full border border-white/15 py-2 ps-2 pe-5">
                  <span className="flex size-9 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-gold tabular-nums">{index + 1}</span>
                  <span className="font-bold">{field}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 inline-flex rounded-full bg-gold px-5 py-2 font-bold text-ink">{profile.disciplines.centre}</p>
          </div>
        </div>
      </PortfolioSection>

      <PortfolioSection id={chapters.qualifications.id} index={indexOf("qualifications")} kicker={chapters.qualifications.kicker} title={chapters.qualifications.title} tone="ivory">
        <PortfolioCredentials education={profile.education} licences={profile.licences} />
      </PortfolioSection>

      <PortfolioSection id={chapters.career.id} index={indexOf("career")} kicker={chapters.career.kicker} title={chapters.career.title} text={profile.career.text}>
        <PortfolioCareer roles={profile.career.roles} present={profile.career.present} image={profile.career.image} />
      </PortfolioSection>

      <PortfolioSection id={chapters.teaching.id} index={indexOf("teaching")} kicker={chapters.teaching.kicker} title={chapters.teaching.title} text={profile.teaching.text} tone="navy" centered>
        <PortfolioExpertise taught={profile.teaching.items} tools={{ title: chapters.tools.title, text: profile.tools.text, items: profile.tools.rows.flat() }} />
      </PortfolioSection>

      <PortfolioSection id={chapters.conferences.id} index={indexOf("conferences")} kicker={chapters.conferences.kicker} title={chapters.conferences.title} text={profile.conferences.text}>
        <PortfolioTalks items={profile.conferences.items} paperLabel={profile.conferences.paperLabel} />
      </PortfolioSection>

      <PortfolioSection id={chapters.books.id} index={indexOf("books")} kicker={chapters.books.kicker} title={chapters.books.title} text={profile.books.text} tone="ivory">
        <PortfolioBooks items={profile.books.items} publishedLabel={profile.books.publishedLabel} inProgressLabel={profile.books.inProgressLabel} author={`${profile.cover.honorific} ${profile.cover.name}`} />
      </PortfolioSection>

      <PortfolioSection id={chapters.strengths.id} index={indexOf("strengths")} kicker={chapters.strengths.kicker} title={chapters.strengths.title}>
        <ol className="cv-stagger grid gap-x-12 sm:grid-cols-2">
          {profile.strengths.items.map((item, index) => (
            <li key={item} style={order(index)} className="flex gap-4 border-t border-line py-5 sm:gap-5 sm:py-6">
              <span aria-hidden="true" className="text-3xl leading-none font-bold text-gold tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="leading-relaxed font-bold text-ink sm:text-lg">{item}</p>
            </li>
          ))}
        </ol>
      </PortfolioSection>

      <Reveal>
        <CtaBand title={closing.title} text={closing.text} primaryAction={localeLink(locale, closing.primaryAction)} secondaryAction={localeLink(locale, closing.secondaryAction)} image={closing.image} />
      </Reveal>
    </div>
  );
}
