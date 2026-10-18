import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { PageHeader } from "@/components/ui/page-header";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { courseCopy } from "@/content/courses";
import { faqContent } from "@/content/faqs";
import { siteText } from "@/content/site";
import { localePath } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { languageAlternates } from "@/lib/metadata";
import { whatsappUrl } from "@/lib/whatsapp";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: faqContent[locale].title, alternates: languageAlternates(locale, "/faqs") };
}

export default async function FaqsPage() {
  const locale = await getLocale();
  const { title, items: faqs } = faqContent[locale];
  const { chrome } = siteText[locale];

  return (
    <>
      <PageHeader title={title} />
      <section className="bg-canvas py-20 sm:py-28">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
            <div className="rounded-[2rem] bg-ink-dark p-8 text-white">
              <span aria-hidden="true" className="block size-1.5 rounded-full bg-gold" />
              <p className="mt-4 text-2xl leading-snug font-bold">{courseCopy[locale].whatsappQuestion}</p>
              <div className="mt-8">
                <ButtonLink href={whatsappUrl()} variant="whatsapp" external>
                  <WhatsAppIcon aria-hidden="true" className="size-5" />
                  {chrome.whatsapp}
                </ButtonLink>
              </div>
            </div>
          </aside>

          <div className="space-y-3 lg:col-span-8">
            {faqs.map((faq) => (
              <details key={faq.id} className="group rounded-2xl border border-line bg-white transition-colors open:border-gold/50">
                <summary className="flex list-none items-center justify-between gap-6 p-6 text-lg font-bold text-ink [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:border-ink group-open:bg-ink group-open:text-white">
                    <Plus aria-hidden="true" className="size-4" />
                  </span>
                </summary>
                <p className="px-6 pb-6 leading-loose">
                  {faq.answer}
                  {faq.link && (
                    <>
                      {" "}
                      <Link href={localePath(locale, faq.link.href)} className="font-bold text-ink underline decoration-gold underline-offset-4 hover:text-gold-dark">
                        {faq.link.label}
                      </Link>
                    </>
                  )}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
