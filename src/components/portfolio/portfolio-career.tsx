import Image from "next/image";
import type { CareerRole } from "@/content/doctor-profile";
import type { ContentImage } from "@/types/content";

interface PortfolioCareerProps {
  roles: CareerRole[];
  /** The word for an ongoing role: "الآن" / "present". */
  present: string;
  image: ContentImage;
}

/** His roles as a ledger, newest first: years, role and place, country. The teaching photo stays beside it on large screens. */
export function PortfolioCareer({ roles, present, image }: PortfolioCareerProps) {
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <figure className="lg:sticky lg:top-36 lg:col-span-4 lg:self-start">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-surface lg:aspect-[4/5]">
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 26rem, 100vw" className="object-cover object-[35%_center]" />
        </div>
      </figure>

      <ol className="lg:col-span-8">
        {roles.map((role) => (
          <li key={`${role.start}-${role.place}`} className="grid grid-cols-[6.5rem_1fr] gap-x-5 gap-y-2 border-b border-line py-6 first:border-t sm:grid-cols-[8.5rem_1fr_auto] sm:gap-x-8">
            <p className="font-bold text-ink tabular-nums">
              {role.start} – {role.end ?? <span className="text-gold-dark">{present}</span>}
            </p>
            <div>
              <p className="text-lg leading-snug font-bold text-ink">{role.role}</p>
              <p className="mt-1 leading-relaxed">{role.place}</p>
            </div>
            <p className="col-start-2 self-start sm:col-start-auto">
              <span className="inline-block rounded-full bg-canvas px-3 py-1 text-xs font-bold text-ink">{role.country}</span>
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
