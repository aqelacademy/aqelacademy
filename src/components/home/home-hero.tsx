import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { IntroTiming } from "@/components/profile/intro-timing";
import { order } from "@/components/profile/order";
import { ButtonLink } from "@/components/ui/button-link";
import { SocialLinks } from "@/components/ui/social-links";
import type { HomeHeroContent } from "@/content/home";
import { siteText } from "@/content/site";
import { localeLink, type Locale } from "@/lib/i18n";

interface HomeHeroProps {
  locale: Locale;
  hero: HomeHeroContent;
  /** The facts strip along the bottom of the hero. */
  children: ReactNode;
}

/**
 * The home page's opening, on navy: the academy's name set large in the display face, the actions and social
 * accounts, and the doctor's photo in an arched frame. The items rise in one after another once the opening
 * screen lifts (IntroTiming, shared with the CV cover), and a thin gold orbit turns slowly behind the photo.
 */
export function HomeHero({ locale, hero, children }: HomeHeroProps) {
  const { name, tagline, chrome } = siteText[locale];
  const actions = [localeLink(locale, hero.primaryAction), localeLink(locale, hero.secondaryAction)];

  return (
    <IntroTiming className="cv-cover">
      <noscript>
        <style>{".cv-cover .cv-intro { animation: none !important; }"}</style>
      </noscript>
      <section className="relative isolate overflow-hidden bg-ink-dark text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="container-site h-full">
            <div className="cv-columns h-full border-x border-white/[0.04]" />
          </div>
          <div className="home-orbit absolute top-[46%] -end-56 size-[48rem] -translate-y-1/2 rounded-full border border-gold/15 max-lg:hidden">
            <span className="absolute top-1/2 -start-1.5 size-3 -translate-y-1/2 rounded-full bg-gold" />
          </div>
          <div className="absolute top-[46%] -end-12 size-[30rem] -translate-y-1/2 rounded-full border border-white/[0.06] max-lg:hidden" />
        </div>

        <div className="container-site grid items-center gap-x-12 gap-y-16 pt-14 pb-16 sm:pt-20 lg:grid-cols-12 lg:pt-24 lg:pb-24">
          <div className="lg:col-span-7">
            <p className="cv-intro flex items-center gap-3 text-sm font-bold text-gold ltr:tracking-wide" style={order(0)}>
              <span aria-hidden="true" className="h-px w-10 bg-gold" />
              {hero.eyebrow}
            </p>
            <h1 className="mt-7 font-display font-semibold">
              <span className="block overflow-hidden pb-2">
                <span className="cv-intro cv-intro-line block text-[2.5rem] leading-[1.3] text-balance sm:text-6xl sm:leading-[1.25] xl:text-[4.25rem]" style={order(1)}>
                  {name}
                </span>
              </span>{" "}
              <span className="block overflow-hidden pb-1">
                <span className="cv-intro cv-intro-line block text-xl font-medium leading-normal text-gold sm:text-2xl xl:text-[1.75rem]" style={order(2)}>
                  {tagline}
                </span>
              </span>
            </h1>
            <p className="cv-intro mt-8 max-w-xl text-lg font-bold leading-relaxed text-white sm:text-xl sm:leading-relaxed" style={order(3)}>
              {hero.lead}
            </p>
            <p className="cv-intro mt-3 max-w-xl leading-loose text-white/65" style={order(3)}>
              {hero.text}
            </p>
            <div className="cv-intro mt-10 flex flex-wrap gap-3" style={order(4)}>
              <ButtonLink href={actions[0].href} variant="gold">
                {actions[0].label}
                <ArrowLeft aria-hidden="true" className="size-4 transition-transform ltr:rotate-180 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
              </ButtonLink>
              <ButtonLink href={actions[1].href} variant="light">
                {actions[1].label}
              </ButtonLink>
            </div>
            <div className="cv-intro mt-10 flex items-center gap-4" style={order(5)}>
              <p className="text-xs font-bold text-white/55">{chrome.followUs}</p>
              <span aria-hidden="true" className="h-px w-8 bg-white/20" />
              <SocialLinks locale={locale} />
            </div>
          </div>

          <figure className="relative mx-auto w-full max-w-[18rem] sm:max-w-[21rem] lg:col-span-5 lg:max-w-[22rem]">
            <div aria-hidden="true" className="cv-intro absolute -inset-3 -bottom-3 rounded-t-full border border-gold/45" style={order(3)} />
            <div className="cv-intro cv-intro-photo relative aspect-[4/5] overflow-hidden rounded-t-full bg-brand" style={order(1)}>
              <Image src={hero.image.src} alt={hero.image.alt} fill preload sizes="(min-width: 1024px) 22rem, (min-width: 640px) 21rem, 18rem" className="object-cover object-[36%_center]" />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink-dark/80 to-transparent" />
            </div>
            <figcaption className="cv-intro relative mx-6 -mt-10 border-t-2 border-gold bg-white px-5 py-4 shadow-pop" style={order(4)}>
              <span className="block font-display text-lg font-semibold text-ink">{hero.caption.name}</span>
              <span className="mt-0.5 block text-sm text-body">{hero.caption.role}</span>
            </figcaption>
          </figure>
        </div>

        {children}
      </section>
    </IntroTiming>
  );
}
