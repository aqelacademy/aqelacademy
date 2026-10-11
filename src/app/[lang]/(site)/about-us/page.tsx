import type { Metadata } from "next";
import { DoctorProfileLink } from "@/components/profile/doctor-profile-link";
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

      <section className="container-site py-20">
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

      <section className="border-y border-line bg-canvas py-20">
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
        <Reveal className="container-site grid gap-12 py-20 lg:grid-cols-2 lg:gap-16">
        <div className={`${cardClassName} border-t-2 border-t-gold p-6 sm:p-8`}>
          <SectionHeading title={aboutWhyUs.title} />
          <div className="font-bold text-ink">
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

      <section className="container-site pb-20">
        <Reveal>
          <SectionHeading title={aboutValues.title} />
          <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {aboutValues.items.map((value, index) => (
              <li key={value.title} className="border-t border-line pt-6">
                <span aria-hidden="true" className="font-heading text-3xl font-bold tabular-nums text-gold">
                  0{index + 1}
                </span>
                <h3 className="mt-3 text-lg font-bold text-ink">{value.title}</h3>
                <p className="mt-2 leading-relaxed">{value.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
    </>
  );
}
