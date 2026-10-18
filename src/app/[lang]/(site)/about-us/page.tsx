import type { Metadata } from "next";
import { DoctorProfileLink } from "@/components/profile/doctor-profile-link";
import { order } from "@/components/profile/order";
import { cardClassName } from "@/components/ui/card";
import { CheckList } from "@/components/ui/check-list";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SplitSection } from "@/components/ui/split-section";
import { aboutContent } from "@/content/about";
import { localePath } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { languageAlternates } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: aboutContent[locale].title, alternates: languageAlternates(locale, "/about-us") };
}

export default async function AboutPage() {
  const locale = await getLocale();
  const { title, vision: aboutVision, academy: aboutAcademy, whyUs: aboutWhyUs, mission: aboutMission, values: aboutValues } = aboutContent[locale];

  return (
    <>
      <PageHeader title={title} />

      <section className="container-site pt-12 pb-20 sm:pt-16 sm:pb-28">
        <Reveal>
          <SplitSection image={aboutVision.image}>
            <SectionHeading title={aboutVision.title} />
            <div className="space-y-4 text-lg leading-loose">
              {aboutVision.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </SplitSection>
        </Reveal>
      </section>

      <section className="border-y border-line bg-canvas py-20 sm:py-28">
        <Reveal className="container-site">
          <SplitSection image={aboutAcademy.image} imageSide="start">
            <SectionHeading title={aboutAcademy.title} />
            <div className="space-y-4 text-lg leading-loose">
              {aboutAcademy.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-6">
              <CheckList items={aboutAcademy.programs} />
            </div>
            <div className="mt-10">
              <DoctorProfileLink
                href={localePath(locale, aboutAcademy.profileLink.href)}
                label={aboutAcademy.profileLink.label}
                caption={aboutAcademy.profileLink.caption}
                image={aboutAcademy.image}
              />
            </div>
          </SplitSection>
        </Reveal>
      </section>

      <section>
        <Reveal className="container-site grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:gap-16">
        <div className="rounded-[2rem] bg-ink-dark p-7 text-white sm:p-10">
          <span aria-hidden="true" className="block size-1.5 rounded-full bg-gold" />
          <h2 className="mt-4 mb-8 text-2xl leading-snug font-bold md:text-4xl md:leading-snug">{aboutWhyUs.title}</h2>
          <div className="text-lg font-bold">
            <CheckList items={aboutWhyUs.points} />
          </div>
        </div>
        <div>
          <SectionHeading title={aboutMission.title} />
          <div className="space-y-4 text-lg leading-loose">
            {aboutMission.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        </Reveal>
      </section>

      <section className="border-t border-line bg-canvas py-20 sm:py-28">
        <Reveal className="container-site">
          <SectionHeading title={aboutValues.title} />
          <ul className="cv-stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {aboutValues.items.map((value, index) => (
              <li key={value.title} style={order(index)} className={`${cardClassName} flex flex-col gap-8 p-7 transition-colors duration-300 hover:border-gold/50`}>
                <span aria-hidden="true" className="text-5xl leading-none font-bold text-gold tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-ink">{value.title}</h3>
                  <p className="mt-2 leading-relaxed">{value.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
    </>
  );
}
