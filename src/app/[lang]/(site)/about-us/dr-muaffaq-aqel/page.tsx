import type { Metadata } from "next";
import { ProfileCover } from "@/components/profile/profile-cover";
import { doctorProfile, doctorProfilePath } from "@/content/doctor-profile";
import { getLocale } from "@/lib/locale";
import { baseOpenGraph, languageAlternates } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { metaTitle, metaDescription, cover } = doctorProfile[locale];
  const { src } = cover.image;
  return {
    title: metaTitle,
    description: metaDescription,
    alternates: languageAlternates(locale, doctorProfilePath),
    openGraph: {
      ...baseOpenGraph(locale),
      type: "profile",
      title: metaTitle,
      description: metaDescription,
      images: [{ url: src.src, width: src.width, height: src.height, alt: cover.image.alt }],
    },
  };
}

/** The doctor's CV, set as a long editorial page. */
export default async function DoctorProfilePage() {
  const profile = doctorProfile[await getLocale()];
  const { chapters } = profile;

  return (
    <div className="cv-page">
      <ProfileCover {...profile.cover} firstChapterId={chapters.profile.id} />
    </div>
  );
}
