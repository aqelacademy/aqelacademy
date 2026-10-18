import { Mail, MapPin, Phone } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import type { Metadata } from "next";
import { cardClassName } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { SocialLinks } from "@/components/ui/social-links";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { contactContent } from "@/content/contact";
import { site, siteText } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { languageAlternates } from "@/lib/metadata";
import { whatsappUrl } from "@/lib/whatsapp";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: contactContent[locale].title, alternates: languageAlternates(locale, "/contact-us") };
}

interface ContactChannel {
  id: "phone" | "whatsapp" | "email" | "location";
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  href?: string;
  /** Latin-only values (numbers, emails) render left-to-right. */
  ltr?: boolean;
  external?: boolean;
}

function channelsFor(locale: Locale): ContactChannel[] {
  const { labels } = contactContent[locale];
  return [
    { id: "phone", icon: Phone, label: labels.phone, value: site.contact.phoneDisplay, href: `tel:${site.contact.phone}`, ltr: true },
    { id: "whatsapp", icon: WhatsAppIcon, label: labels.whatsapp, value: labels.whatsappValue, href: whatsappUrl(), external: true },
    { id: "email", icon: Mail, label: labels.email, value: site.contact.email, href: `mailto:${site.contact.email}`, ltr: true },
    { id: "location", icon: MapPin, label: labels.address, value: siteText[locale].location },
  ];
}

export default async function ContactPage() {
  const locale = await getLocale();
  const { title, intro: contactIntro } = contactContent[locale];
  const channels = channelsFor(locale);

  return (
    <>
      <PageHeader title={title} />
      <section className="container-site grid gap-12 pt-12 pb-20 sm:pt-16 sm:pb-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading title={contactIntro.title} />
          <div className="space-y-4 text-lg leading-loose">
            {contactIntro.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10 rounded-[2rem] bg-ink-dark p-7 text-white">
            <p className="flex items-center gap-3 text-sm font-medium text-white/70">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
              {siteText[locale].chrome.followUs}
            </p>
            <div className="mt-5">
              <SocialLinks locale={locale} />
            </div>
          </div>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {channels.map(({ id, icon: Icon, label, value, href, ltr, external }) => (
            <li key={id} className={`${cardClassName} relative flex flex-col p-7 transition-colors duration-300 hover:border-gold/50`}>
              <span className={`flex size-14 items-center justify-center rounded-full ${id === "whatsapp" ? "bg-whatsapp-dark text-white" : "bg-ink text-gold"}`}>
                <Icon aria-hidden="true" className="size-6" />
              </span>
              <h2 className="mt-10 text-sm text-body">{label}</h2>
              {href ? (
                <a
                  href={href}
                  dir={ltr ? "ltr" : undefined}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="mt-1 block text-lg font-bold break-all text-ink after:absolute after:inset-0 after:rounded-2xl ltr:text-left rtl:text-right"
                >
                  {value}
                </a>
              ) : (
                <p className="mt-1 text-lg font-bold text-ink">{value}</p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
