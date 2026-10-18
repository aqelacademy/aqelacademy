import Image from "next/image";
import Link from "next/link";
import { HomeSectionHeading } from "@/components/home/home-section-heading";
import { ArrowLink } from "@/components/home/arrow-link";
import { PillArrow } from "@/components/home/pill-arrow";
import { order } from "@/components/profile/order";
import type { ContentImage, NavLink, TitledText } from "@/types/content";

interface HomeApproachProps {
  heading: { kicker: string; title: string; text: string };
  points: TitledText[];
  image: ContentImage;
  caption: { name: string; role: string };
  /** Both already carry the locale prefix. */
  actions: [NavLink, NavLink];
}

/**
 * "Why us": the doctor's photo held in place on the start side (sticky on large screens) with his name on a white
 * plate, beside four numbered reasons. Each reason comes into focus as it reaches the middle of the screen, its
 * numeral turning gold (`.home-focus`, a CSS view timeline; browsers without one show them all in full).
 */
export function HomeApproach({ heading, points, image, caption, actions }: HomeApproachProps) {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
        <figure className="relative lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-surface sm:aspect-[4/5]">
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 32rem, 100vw" className="object-cover object-[35%_center]" />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-dark/80 to-transparent" />
          </div>
          <figcaption className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-full bg-white py-2.5 ps-6 pe-2.5 shadow-pop sm:inset-x-6 sm:bottom-6">
            <span>
              <span className="block text-lg leading-snug font-bold text-ink">{caption.name}</span>
              <span className="block text-xs text-body">{caption.role}</span>
            </span>
            <span aria-hidden="true" className="size-2 rounded-full bg-gold" />
          </figcaption>
        </figure>

        <div className="lg:col-span-7">
          <HomeSectionHeading index="02" kicker={heading.kicker} title={heading.title} />
          <p className="max-w-2xl text-lg leading-loose">{heading.text}</p>

          <ol className="mt-12">
            {points.map((point, index) => (
              <li key={point.title} style={order(index)} className="home-focus grid grid-cols-[3.5rem_1fr] gap-x-4 border-t border-line py-8 last:border-b sm:grid-cols-[6rem_1fr] sm:gap-x-6">
                <span aria-hidden="true" className="home-focus-number text-4xl leading-none font-bold text-ink/25 tabular-nums sm:text-6xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl leading-snug font-bold text-ink sm:text-2xl">{point.title}</h3>
                  <p className="mt-2 max-w-xl leading-relaxed">{point.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
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
      </div>
    </section>
  );
}
