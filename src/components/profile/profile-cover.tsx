import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IntroTiming } from "@/components/profile/intro-timing";
import { order } from "@/components/profile/order";
import { ScrollProgress } from "@/components/profile/scroll-progress";
import type { ContentImage, NavLink } from "@/types/content";

interface ProfileCoverProps {
  eyebrow: string;
  honorific: string;
  name: string;
  fullName: string;
  role: string;
  facts: { label: string; value: string }[];
  scrollCue: string;
  image: ContentImage;
  /** The first chapter's id, for the scroll cue. */
  firstChapterId: string;
  /** The page above (About us), with the locale prefix. */
  back: NavLink;
  breadcrumbLabel: string;
}

/**
 * The page's opening: a navy title page with the name set large and the portrait unveiled beside it. On phones and
 * tablets the portrait runs edge to edge at the top and fades into the navy, with the name rising over the fade.
 */
export function ProfileCover({ eyebrow, honorific, name, fullName, role, facts, scrollCue, image, firstChapterId, back, breadcrumbLabel }: ProfileCoverProps) {
  return (
    <IntroTiming className="cv-cover">
      <noscript>
        <style>{".cv-intro, .cv-intro-photo img { animation: none !important; }"}</style>
      </noscript>
      <ScrollProgress mode="exit" className="relative isolate overflow-hidden bg-ink-dark text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="container-site h-full">
            <div className="cv-columns h-full border-x border-white/[0.04]" />
          </div>
          <div className="absolute top-1/2 -end-48 size-[44rem] -translate-y-1/2 rounded-full border border-gold/15 max-lg:hidden" />
          <div className="absolute top-1/2 -end-20 size-[28rem] -translate-y-1/2 rounded-full border border-gold/10 max-lg:hidden" />
        </div>

        <div className="container-site grid pb-14 sm:pb-16 lg:min-h-[calc(100svh-4.1875rem)] lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-20">
          <div className="cv-cover-text relative z-10 max-lg:-mt-24 sm:max-lg:-mt-32 lg:col-span-7">
            <nav aria-label={breadcrumbLabel} className="cv-intro max-lg:absolute max-lg:top-4 max-lg:start-4 lg:mb-14" style={order(0)}>
              <Link
                href={back.href}
                className="group inline-flex items-center gap-2 text-sm font-bold text-white/70 transition-colors hover:text-white max-lg:rounded-full max-lg:bg-ink-dark/60 max-lg:px-3.5 max-lg:py-2 max-lg:text-white max-lg:backdrop-blur-sm"
              >
                <ArrowRight aria-hidden="true" className="size-4 text-gold transition-transform ltr:rotate-180 rtl:group-hover:translate-x-0.5 ltr:group-hover:-translate-x-0.5" />
                {back.label}
              </Link>
            </nav>
            <p className="cv-intro flex items-center gap-3 text-sm font-bold text-gold ltr:tracking-wide" style={order(0)}>
              <span aria-hidden="true" className="h-px w-10 bg-gold" />
              {eyebrow}
            </p>
            <h1 className="mt-6 font-heading font-bold sm:mt-8">
              <span className="block overflow-hidden pb-1">
                <span className="cv-intro cv-intro-line block text-2xl text-gold sm:text-3xl" style={order(1)}>
                  {honorific}
                </span>
              </span>{" "}
              <span className="block overflow-hidden pb-3">
                <span className="cv-intro cv-intro-line block text-6xl leading-[1.2] sm:text-7xl lg:text-[5.25rem] xl:text-8xl" style={order(2)}>
                  {name}
                </span>
              </span>
            </h1>
            <p className="cv-intro mt-4 text-sm text-white/60" style={order(3)}>
              {fullName}
            </p>
            <p className="cv-intro mt-5 max-w-xl text-lg leading-loose text-white/85 sm:text-xl sm:leading-loose" style={order(4)}>
              {role}
            </p>
            <dl className="cv-intro mt-10 grid max-w-xl grid-cols-3 border-t border-white/15" style={order(5)}>
              {facts.map((fact) => (
                <div key={fact.label} className="pt-5 pe-3 [&+&]:border-s [&+&]:border-white/15 [&+&]:ps-4">
                  <dt className="text-xs text-white/55">{fact.label}</dt>
                  <dd className="mt-1.5 font-bold text-white sm:text-lg">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <a
              href={`#${firstChapterId}`}
              className="cv-intro group mt-14 hidden items-center gap-4 text-sm font-bold text-white/60 transition-colors hover:text-gold lg:inline-flex"
              style={order(6)}
            >
              <span aria-hidden="true" className="relative h-12 w-px overflow-hidden bg-white/20">
                <span className="cv-cue absolute inset-x-0 top-0 h-1/2 bg-gold" />
              </span>
              {scrollCue}
            </a>
          </div>

          <div className="relative max-lg:order-first max-lg:-mx-4 lg:col-span-5">
            <div className="cv-cover-photo relative lg:pe-5 lg:pb-5">
              <div aria-hidden="true" className="cv-intro absolute top-5 start-5 end-0 bottom-0 rounded-lg border border-gold/60 max-lg:hidden" style={order(4)} />
              <div className="cv-intro cv-intro-photo relative h-[min(125vw,70svh)] overflow-hidden bg-brand lg:aspect-[4/5] lg:h-auto lg:rounded-lg" style={order(1)}>
                <Image src={image.src} alt={image.alt} fill preload sizes="(min-width: 1024px) 32rem, 100vw" className="object-cover object-[50%_25%]" />
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-ink-dark from-15% via-ink-dark/70 to-transparent lg:hidden" />
              </div>
            </div>
            <p aria-hidden="true" className="cv-intro absolute top-0 -end-8 text-xs font-bold tracking-[0.35em] text-gold/80 [writing-mode:vertical-rl] max-xl:hidden" style={order(6)}>
              PhD · QBA · IBA
            </p>
          </div>
        </div>
      </ScrollProgress>
    </IntroTiming>
  );
}
