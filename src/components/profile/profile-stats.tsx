import { CountUp } from "@/components/profile/count-up";
import type { ProfileStat } from "@/content/doctor-profile";

interface ProfileStatsProps {
  stats: ProfileStat[];
}

/** Four large figures under the cover, divided by hairlines; each counts up as it comes into view. */
export function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <section className="border-b border-line">
      <div className="container-site">
        <dl className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse justify-end gap-3 bg-white px-4 py-8 sm:px-8 sm:py-14 max-lg:odd:ps-0 lg:first:ps-0">
              <dt className="max-w-[14rem] text-sm leading-relaxed sm:text-base">{stat.label}</dt>
              {/* In RTL the plus lands before the number ("+20"), in LTR after it ("20+"). */}
              <dd className="flex items-start text-[2.75rem] font-bold leading-none text-ink tabular-nums sm:text-6xl">
                <CountUp value={stat.value} />
                {stat.suffix && <span className="mx-1 text-3xl text-gold sm:text-4xl">{stat.suffix}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
