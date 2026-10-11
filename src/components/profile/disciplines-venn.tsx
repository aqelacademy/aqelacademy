import { ScrollProgress } from "@/components/profile/scroll-progress";

interface DisciplinesVennProps {
  /** In the order he studied them: top, then bottom start, then bottom end. */
  fields: [string, string, string];
  centre: string;
}

const circles = [
  { className: "cv-venn-a border-gold/70 bg-gold/[0.07]", labelClassName: "inset-x-[18%] top-[19%] text-center" },
  { className: "cv-venn-b border-brand/35 bg-brand/[0.04]", labelClassName: "bottom-[27%] start-[13%] max-w-[42%] text-start" },
  { className: "cv-venn-c border-brand/60 bg-brand/[0.07]", labelClassName: "bottom-[27%] end-[13%] max-w-[42%] text-end" },
];

/** Three circles, one per discipline, that drift together as the section scrolls into place; their overlap is the integrated view. */
export function DisciplinesVenn({ fields, centre }: DisciplinesVennProps) {
  return (
    <ScrollProgress mode="track" className="cv-venn relative mx-auto aspect-square w-full max-w-[20rem] sm:max-w-[26rem]">
      {circles.map((circle, index) => (
        <div key={fields[index]} className={`cv-venn-circle absolute top-[21%] left-[21%] aspect-square w-[58%] rounded-full border mix-blend-multiply ${circle.className}`}>
          <span className={`absolute text-xs font-bold leading-snug text-ink sm:text-sm ${circle.labelClassName}`}>{fields[index]}</span>
        </div>
      ))}
      <p className="cv-venn-centre absolute top-1/2 left-1/2 rounded-full bg-ink px-3 py-1.5 text-[0.7rem] font-bold whitespace-nowrap text-white shadow-lift sm:text-xs">{centre}</p>
    </ScrollProgress>
  );
}
