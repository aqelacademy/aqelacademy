import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CountUp } from "@/components/profile/count-up";
import { IntroTiming } from "@/components/profile/intro-timing";
import { order } from "@/components/profile/order";
import { ArrowLink } from "@/components/ui/arrow-link";
import { PillArrow } from "@/components/ui/pill-arrow";
import type { ProfileStat } from "@/content/doctor-profile";
import type { ContentImage, NavLink } from "@/types/content";

interface PortfolioHeroProps {
  cover: { eyebrow: string; honorific: string; name: string; fullName: string; role: string; facts: { label: string; value: string }[]; image: ContentImage };
  stats: ProfileStat[];
  /** All links already carry the locale prefix. */
  back: NavLink;
  actions: [NavLink, NavLink];
  breadcrumbLabel: string;
}

/**
 * The portfolio's opening on warm ivory: his name set large beside his photo (above it on phones), which sits on
 * a navy card turned a few degrees behind it. Credentials as small plates, two actions, then the four figures on a white panel that
 * count up. Items rise in one after another once the opening screen lifts (IntroTiming + `cv-intro`).
 */
export function PortfolioHero({ cover, stats, back, actions, breadcrumbLabel }: PortfolioHeroProps) {
  return (
    <IntroTiming className="portfolio-hero">
      <noscript>
        <style>{".portfolio-hero .cv-intro { animation: none !important; }"}</style>
      </noscript>
      <section className="overflow-hidden bg-gold-soft/60 pb-12 sm:pb-16">
        <nav aria-label={breadcrumbLabel} className="cv-intro container-site pt-8 sm:pt-10" style={order(0)}>
          <Link href={back.href} className="group inline-flex items-center gap-2 text-sm font-bold text-body transition-colors hover:text-ink">
            <ArrowRight aria-hidden="true" className="size-4 text-gold transition-transform ltr:rotate-180 rtl:group-hover:translate-x-0.5 ltr:group-hover:-translate-x-0.5" />
            {back.label}
          </Link>
        </nav>
        <div className="container-site grid items-center gap-10 pt-8 pb-16 lg:grid-cols-12 lg:gap-16 lg:pb-20">
          <div className="lg:col-span-7">
            <p className="cv-intro inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white px-4 py-1.5 text-sm font-bold text-gold-dark" style={order(1)}>
              <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
              {cover.eyebrow}
            </p>
            <h1 className="mt-6">
              <span className="cv-intro block text-2xl font-bold text-gold-dark sm:text-3xl" style={order(2)}>
                {cover.honorific}
              </span>{" "}
              <span className="cv-intro block text-6xl leading-[1.15] font-bold text-ink sm:text-7xl xl:text-8xl xl:leading-[1.1]" style={order(2)}>
                {cover.name}
              </span>
            </h1>
            <p className="cv-intro mt-3 text-sm text-body" style={order(3)}>
              {cover.fullName}
            </p>
            <p className="cv-intro mt-6 max-w-xl text-xl leading-relaxed font-bold text-ink" style={order(3)}>
              {cover.role}
            </p>
            <dl className="cv-intro mt-8 flex flex-wrap gap-3" style={order(4)}>
              {cover.facts.map((fact) => (
                <div key={fact.label} className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow-card">
                  <dt className="text-body">{fact.label}</dt>
                  <dd className="font-bold text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <div className="cv-intro mt-10 flex flex-wrap items-center gap-x-8 gap-y-5" style={order(5)}>
              <Link
                href={actions[0].href}
                className="group inline-flex items-center gap-4 rounded-full bg-ink py-2 ps-7 pe-2 font-bold text-white transition-colors duration-300 hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
              >
                {actions[0].label}
                <PillArrow className="size-10 bg-white text-ink group-hover:bg-gold" />
              </Link>
              <ArrowLink link={actions[1]} />
            </div>
          </div>

          <figure className="cv-intro relative mx-auto w-full max-w-[17rem] max-lg:order-first sm:max-w-sm lg:col-span-5 lg:max-w-md" style={order(2)}>
            <div aria-hidden="true" className="absolute inset-0 translate-x-2 translate-y-2 -rotate-3 rounded-[2.5rem] bg-ink sm:translate-x-5 sm:translate-y-5" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-surface">
              <Image src={cover.image.src} alt={cover.image.alt} fill preload sizes="(min-width: 1024px) 28rem, 90vw" className="object-cover object-[40%_center]" />
            </div>
          </figure>
        </div>

        <div className="container-site">
          <dl className="cv-intro grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] bg-line shadow-card lg:grid-cols-4" style={order(6)}>
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse justify-end gap-2 bg-white p-6 sm:p-8">
                <dt className="text-sm leading-relaxed">{stat.label}</dt>
                {/* In RTL the plus lands before the number ("+25"), in LTR after it ("25+"). */}
                <dd className="flex items-start text-4xl leading-none font-bold text-ink tabular-nums sm:text-5xl">
                  <CountUp value={stat.value} />
                  {stat.suffix && <span className="mx-1 text-2xl text-gold sm:text-3xl">{stat.suffix}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </IntroTiming>
  );
}
