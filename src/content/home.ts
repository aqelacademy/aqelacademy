import classroom from "@/assets/images/classroom.jpg";
import qabaCourseworkProvider from "@/assets/images/qaba-coursework-provider.jpg";
import qabaTrainingProgram from "@/assets/images/qaba-training-program.jpg";
import type { Locale } from "@/lib/i18n";
import type { ContentImage, NavLink } from "@/types/content";

/** The badges carry QABA's own wording, so their alt text stays as printed in both languages. */
const accreditations: ContentImage[] = [
  { src: qabaTrainingProgram, alt: "QABA Approved Training Program" },
  { src: qabaCourseworkProvider, alt: "QABA Approved Coursework Provider" },
];

/** His real experience (the CVs say 20 because they are old). */
const yearsOfExperience = 25;

interface HomeSection {
  /** The small label over the title. */
  kicker: string;
  title: string;
}

/** The title is the academy's name and tagline (`siteText`). */
export interface HomeHeroContent {
  eyebrow: string;
  lead: string;
  image: ContentImage;
  primaryAction: NavLink;
  secondaryAction: NavLink;
  scrollCue: string;
}

interface HomeContent {
  hero: HomeHeroContent;
  /** The programme count comes from the courses themselves. */
  stats: { years: number; yearsLabel: string; programmesLabel: string };
  accreditationsTitle: string;
  accreditations: ContentImage[];
  featuredCourses: HomeSection & { action: NavLink };
  journey: HomeSection & { text: string; points: string[]; primaryAction: NavLink; secondaryAction: NavLink };
  latestArticles: HomeSection & { action: NavLink };
  cta: { title: string; text: string; primaryAction: NavLink; secondaryAction: NavLink };
}

const taglines: Record<Locale, string> = {
  ar: "تمكين المتخصصين من خلال العلم والممارسة",
  en: "Empowering Professionals Through Science & Practice",
};

/** Hrefs are locale-free; the page adds the /en prefix. */
export const homeContent: Record<Locale, HomeContent> = {
  ar: {
    hero: {
      eyebrow: taglines.ar,
      lead: "نُعدّ متخصصي المستقبل في تحليل السلوك التطبيقي والتربية الخاصة",
      image: { src: classroom, alt: "أطفال يتعلمون باللعب في غرفة صفية هادئة مليئة بالألعاب التعليمية" },
      primaryAction: { href: "/courses", label: "استعرض الدورات" },
      secondaryAction: { href: "/contact-us", label: "تواصل معنا" },
      scrollCue: "اكتشف المزيد",
    },
    stats: { years: yearsOfExperience, yearsLabel: "عامًا من الخبرة الميدانية", programmesLabel: "برامج تدريبية معتمدة" },
    accreditationsTitle: "معتمدون من",
    accreditations,
    featuredCourses: {
      kicker: "البرامج التدريبية",
      title: "الدورات المميزة",
      action: { href: "/courses", label: "جميع الدورات" },
    },
    journey: {
      kicker: "لماذا نحن",
      title: "ابدأ رحلتك معنا",
      text: "سواء كنت معلمًا، أو أخصائيًا، أو ولي أمر يبحث عن المعرفة، ستجد في أكاديمية الدكتور موفق عقل التدريب والدعم الذي تحتاجه لتطوير مهاراتك وتحقيق أهدافك.",
      points: ["شهادات تدريب معتمدة", "تدريب عملي وتفاعلي", "إشراف مباشر من مختصين ذوي خبرة", "محتوى علمي محدث باستمرار"],
      primaryAction: { href: "/courses", label: "سجّل الآن" },
      secondaryAction: { href: "/contact-us", label: "اتصل بنا" },
    },
    latestArticles: {
      kicker: "المعرفة",
      title: "آخر المقالات",
      action: { href: "/blog", label: "جميع المقالات" },
    },
    cta: {
      title: "هل أنت مستعد لبدء رحلتك التدريبية؟",
      text: "أنشئ حسابك واحجز مقعدك في الدورة، وسيتواصل معك الدكتور لترتيب التفاصيل.",
      primaryAction: { href: "/register", label: "أنشئ حسابك" },
      secondaryAction: { href: "/courses", label: "استعرض الدورات" },
    },
  },
  en: {
    hero: {
      eyebrow: taglines.en,
      lead: "Preparing tomorrow's specialists in Applied Behaviour Analysis and special education",
      image: { src: classroom, alt: "Children learning through play in a calm classroom full of educational toys" },
      primaryAction: { href: "/courses", label: "Browse courses" },
      secondaryAction: { href: "/contact-us", label: "Contact us" },
      scrollCue: "Discover more",
    },
    stats: { years: yearsOfExperience, yearsLabel: "years of field experience", programmesLabel: "accredited training programmes" },
    accreditationsTitle: "Approved by",
    accreditations,
    featuredCourses: {
      kicker: "Training programmes",
      title: "Featured courses",
      action: { href: "/courses", label: "All courses" },
    },
    journey: {
      kicker: "Why us",
      title: "Start your journey with us",
      text: "Whether you are a teacher, a specialist or a parent who wants to learn more, Dr Muaffaq Aqel Academy gives you the training and support you need to build your skills and reach your goals.",
      points: ["Accredited training certificates", "Practical, interactive training", "Direct supervision by experienced specialists", "Evidence-based content, kept up to date"],
      primaryAction: { href: "/courses", label: "Enrol now" },
      secondaryAction: { href: "/contact-us", label: "Contact us" },
    },
    latestArticles: {
      kicker: "Knowledge",
      title: "Latest articles",
      action: { href: "/blog", label: "All articles" },
    },
    cta: {
      title: "Ready to start your training?",
      text: "Create an account and book your place on a course. Dr Aqel will then contact you to arrange the details.",
      primaryAction: { href: "/register", label: "Create an account" },
      secondaryAction: { href: "/courses", label: "Browse courses" },
    },
  },
};
