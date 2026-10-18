import { SocialIcon } from "@/components/ui/social-icon";
import { site, siteText } from "@/content/site";
import type { Locale } from "@/lib/i18n";

interface SocialLinksProps {
  locale: Locale;
}

/** The academy's social accounts as round icon links, for navy backgrounds (hero, footer). On hover gold rises from the bottom of the circle. */
export function SocialLinks({ locale }: SocialLinksProps) {
  const { followUs, social } = siteText[locale].chrome;

  return (
    <ul aria-label={followUs} className="flex items-center gap-2.5">
      {site.social.map(({ network, href }) => (
        <li key={network}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social[network]}
            title={social[network]}
            className="relative isolate flex size-11 items-center justify-center overflow-hidden rounded-full border border-white/20 text-white/80 transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 before:bg-gold before:transition-transform before:duration-300 before:ease-out hover:border-gold hover:text-ink-dark hover:before:scale-y-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <SocialIcon network={network} aria-hidden="true" className="size-[1.05rem]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
