import { ArrowLeft } from "lucide-react";

interface PillArrowProps {
  /** Size and colors. */
  className?: string;
}

/** The round arrow of the hero's pill button; inside a `group`, it turns to point up and forward on hover. */
export function PillArrow({ className = "size-10 bg-ink text-white" }: PillArrowProps) {
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${className}`}>
      <ArrowLeft aria-hidden="true" className="size-4 transition-transform duration-500 ltr:rotate-180 rtl:group-hover:-rotate-45 ltr:group-hover:rotate-[225deg]" />
    </span>
  );
}
