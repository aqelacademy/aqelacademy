import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { NavLink } from "@/types/content";

interface ArrowLinkProps {
  /** Already carries the locale prefix. */
  link: NavLink;
  /** Text color; the underline follows it. */
  className?: string;
}

/** A text link whose underline draws in from the reading edge on hover while its arrow steps forward. */
export function ArrowLink({ link, className = "text-ink" }: ArrowLinkProps) {
  return (
    <Link href={link.href} className={`group inline-flex items-center gap-2 font-bold ${className}`}>
      <span className="relative after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 group-hover:after:scale-x-100 ltr:after:origin-left">
        {link.label}
      </span>
      <ArrowLeft aria-hidden="true" className="size-4 transition-transform duration-300 ltr:rotate-180 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
    </Link>
  );
}
