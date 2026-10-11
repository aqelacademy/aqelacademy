import drPortrait from "@/assets/images/dr-muaffaq-portrait.jpg";
import drTeaching from "@/assets/images/dr-muaffaq-teaching.jpg";
import type { Locale } from "@/lib/i18n";
import type { ContentImage, NavLink } from "@/types/content";

/** The doctor's CV page (/about-us/dr-muaffaq-aqel), built from his Arabic and English CVs (2026). */
export const doctorProfilePath = "/about-us/dr-muaffaq-aqel";

export type ChapterId = "profile" | "qualifications" | "career" | "teaching" | "tools" | "conferences" | "books" | "strengths";

export interface Chapter {
  id: ChapterId;
  /** Short label for the side index. */
  label: string;
  kicker: string;
  title: string;
}

export interface ProfileStat {
  value: number;
  /** "+" for "more than". */
  suffix?: string;
  label: string;
}

export interface Disciplines {
  title: string;
  text: string;
  /** In the order he studied them. */
  fields: [string, string, string];
  centre: string;
}

export interface Degree {
  year: number;
  title: string;
  place: string;
}

export interface Licence {
  year: number;
  title: string;
  issuer?: string;
  /** Licence number, shown so it can be checked with the board. */
  number?: string;
}

export interface CareerRole {
  start: number;
  /** Left out while the role is current. */
  end?: number;
  role: string;
  place: string;
  country: string;
}

export interface Conference {
  year: number;
  country: string;
  title: string;
}

export interface Book {
  title: string;
  published: boolean;
}

interface DoctorProfile {
  metaTitle: string;
  metaDescription: string;
  /** The side index's accessible name. */
  chaptersLabel: string;
  chapters: Record<ChapterId, Chapter>;
  cover: {
    eyebrow: string;
    honorific: string;
    name: string;
    fullName: string;
    role: string;
    facts: { label: string; value: string }[];
    scrollCue: string;
    image: ContentImage;
  };
  stats: ProfileStat[];
  /** Read word by word as it scrolls past. */
  intro: string;
  disciplines: Disciplines;
  education: { title: string; steps: Degree[] };
  licences: { title: string; numberLabel: string; items: Licence[] };
  career: { text: string; present: string; image: ContentImage; roles: CareerRole[] };
  teaching: { text: string; items: string[] };
  tools: { text: string; rows: [string[], string[]] };
  conferences: { text: string; paperLabel: string; items: Conference[] };
  books: { text: string; publishedLabel: string; inProgressLabel: string; items: Book[] };
  strengths: { items: string[] };
  closing: { title: string; text: string; primaryAction: NavLink; secondaryAction: NavLink };
}

export const doctorProfile: Record<Locale, DoctorProfile> = {
  ar: {
    metaTitle: "الدكتور موفق عقل: السيرة الذاتية",
    metaDescription:
      "السيرة الذاتية للدكتور موفق عقل: دكتوراه في التربية الخاصة والتأهيل، محلل سلوك دولي معتمد (QBA)، وأكثر من 20 عامًا في التدريب والتأهيل السلوكي في الأردن وسلطنة عُمان والإمارات.",
    chaptersLabel: "أقسام السيرة الذاتية",
    chapters: {
      profile: { id: "profile", label: "النبذة", kicker: "نبذة", title: "من هو الدكتور موفق عقل؟" },
      qualifications: { id: "qualifications", label: "المؤهلات", kicker: "المؤهلات", title: "الشهادات والتراخيص الدولية" },
      career: { id: "career", label: "المسيرة", kicker: "المسيرة المهنية", title: "عشرون عامًا في الميدان" },
      teaching: { id: "teaching", label: "التدريب", kicker: "التدريب", title: "دبلومات ودورات قدّمها" },
      tools: { id: "tools", label: "المقاييس", kicker: "التطوير المهني", title: "المقاييس والبرامج التي تدرّب عليها" },
      conferences: { id: "conferences", label: "المؤتمرات", kicker: "البحث العلمي", title: "أوراق علمية في مؤتمرات وملتقيات" },
      books: { id: "books", label: "المؤلفات", kicker: "المؤلفات", title: "الكتب والمؤلفات" },
      strengths: { id: "strengths", label: "نقاط القوة", kicker: "ما يميّزه", title: "أبرز نقاط القوة" },
    },
    cover: {
      eyebrow: "السيرة الذاتية",
      honorific: "الدكتور",
      name: "موفق عقل",
      fullName: "موفق محمود عبد الفتاح عقل",
      role: "دكتوراه في التربية الخاصة والتأهيل، ومحلل سلوك دولي معتمد من البورد الأمريكي (QBA).",
      facts: [
        { label: "الجنسية", value: "أردني" },
        { label: "الإقامة", value: "سلطنة عُمان" },
        { label: "ترخيص QBA", value: "14456" },
      ],
      scrollCue: "تابع القراءة",
      image: { src: drPortrait, alt: "الدكتور موفق عقل" },
    },
    stats: [
      { value: 20, suffix: "+", label: "عامًا من الخبرة في التدريب والتأهيل" },
      { value: 100, suffix: "+", label: "دورة تدريبية تخصصية قدّمها" },
      { value: 500, suffix: "+", label: "ساعة تدريب في برامج QABA" },
      { value: 8, label: "أوراق علمية في مؤتمرات وملتقيات" },
    ],
    intro:
      "أكثر من عشرين عامًا قضاها الدكتور موفق عقل بين قاعات التدريب ومراكز التأهيل والجامعات، في الأردن وسلطنة عُمان والإمارات. يجمع بين العلاج الطبيعي والتربية الخاصة وتحليل السلوك التطبيقي، ويحمل البورد الأمريكي الدولي محللًا سلوكيًا معتمدًا، ليقدّم للمتخصصين علمًا يُطبَّق في الميدان، لا يبقى على الورق.",
    disciplines: {
      title: "ثلاثة تخصصات، ونظرة واحدة",
      text: "بدأ مسيرته في العلاج الطبيعي، ثم تخصص في التربية الخاصة والتأهيل حتى الدكتوراه، ثم في تحليل السلوك التطبيقي. لذلك يرى الطفل والأسرة والبرنامج صورة واحدة متكاملة، لا أجزاءً منفصلة.",
      fields: ["العلاج الطبيعي", "التربية الخاصة", "تحليل السلوك التطبيقي"],
      centre: "نظرة تكاملية",
    },
    education: {
      title: "المسار الأكاديمي",
      steps: [
        { year: 2003, title: "دبلوم العلاج الطبيعي", place: "وزارة الصحة الأردنية" },
        { year: 2007, title: "بكالوريوس العلاج الطبيعي", place: "الجامعة الأردنية" },
        { year: 2012, title: "ماجستير التربية الخاصة", place: "جامعة عمّان العربية" },
        { year: 2015, title: "دكتوراه التربية الخاصة والتأهيل", place: "الجامعة الأردنية" },
      ],
    },
    licences: {
      title: "التراخيص والاعتمادات",
      numberLabel: "رقم الترخيص",
      items: [
        { year: 2026, title: "مدرب معتمد في بطء التعلم وصعوباته", issuer: "وزارة التعليم العالي الأردنية" },
        { year: 2023, title: "محلل سلوك دولي معتمد (QBA)", issuer: "البورد الأمريكي الدولي QABA", number: "14456" },
        { year: 2023, title: "محلل سلوك دولي معتمد (IBA)", issuer: "البورد الأمريكي الدولي IBAO", number: "10914297" },
        { year: 2020, title: "مدرب معتمد لاختبار لايتر 3", issuer: "بانا للاستشارات التربوية، المقر الإقليمي المعتمد لاختبار لايتر في الوطن العربي" },
        { year: 2018, title: "مدرب دولي معتمد في تشخيص التوحد وتأهيله" },
      ],
    },
    career: {
      text: "خبير فني ومستشار سلوكي ومحاضر ومدرب، عمل مع جمعيات ووزارات وجامعات ومعاهد تدريب في ثلاث دول.",
      present: "الآن",
      image: { src: drTeaching, alt: "الدكتور موفق عقل خلال إحدى الدورات التدريبية" },
      roles: [
        { start: 2025, end: 2026, role: "مدرب", place: "مشاريع وزارة العمل ووزارة التنمية الاجتماعية لإعداد أخصائيي التربية الخاصة والتأهيل المهني لغايات التوظيف", country: "سلطنة عُمان" },
        { start: 2025, end: 2026, role: "مستشار", place: "استشارات سلوكية وتأهيلية لعدد من المدارس", country: "سلطنة عُمان" },
        { start: 2024, end: 2026, role: "مدرب دولي", place: "معهد إمباكت الدولي للتدريب", country: "الإمارات" },
        { start: 2022, role: "مدرب في الإعاقة والتحليل السلوكي والتربوي", place: "معهد جينوفا للتطوير الإداري", country: "الإمارات" },
        { start: 2020, end: 2025, role: "مستشار", place: "استشارات سلوكية وتأهيلية في دار رعاية الأيتام", country: "سلطنة عُمان" },
        { start: 2018, role: "خبير فني ومستشار سلوكي", place: "جمعية التدخل المبكر للأطفال ذوي الإعاقة", country: "سلطنة عُمان" },
        { start: 2018, end: 2022, role: "مستشار نفسي وسلوكي", place: "عيادة القمة للاستشارات النفسية والسلوكية", country: "سلطنة عُمان" },
        { start: 2017, end: 2018, role: "خبير فني ومستشار سلوكي", place: "وزارة التنمية الاجتماعية، وحدة الأمان للإعاقات الشديدة", country: "سلطنة عُمان" },
        { start: 2016, end: 2017, role: "خبير فني ومستشار سلوكي", place: "جمعية رعاية الأطفال ذوي الإعاقة", country: "سلطنة عُمان" },
        { start: 2014, end: 2016, role: "مدرب في الإعاقة والتحليل السلوكي والتربوي", place: "شركة برافو للاستشارات والتدريب", country: "الأردن" },
        { start: 2012, end: 2016, role: "محاضر التربية الخاصة والتأهيل", place: "كلية وادي السير، الأونروا", country: "الأردن" },
        { start: 2012, end: 2015, role: "مدرب في الإعاقة والتحليل السلوكي والتربوي", place: "جمعية ضع بصمتك", country: "الأردن" },
        { start: 2004, end: 2014, role: "مدير فني ومستشار سلوكي", place: "مركز الحاجة رفيقة لذوي الإعاقة، للاجئين الفلسطينيين", country: "الأردن" },
      ],
    },
    teaching: {
      text: "قدّم أكثر من 100 دورة تدريبية تخصصية، أغلبها دبلومات تدريبية، ومنها:",
      items: [
        "معلّمة الظل (Shadow Teacher)",
        "مساعد مدرب نطق والتأهيل السمعي لزارعي القوقعة",
        "معلّم التوحد",
        "مدرب ذوي الاحتياجات الخاصة",
        "مدرب العلاج الوظيفي والتكامل الحسي",
        "تحليل السلوك التطبيقي (ABA)",
        "إعداد الخطط التربوية",
        "التدريب على مقياس VB-MAPP",
        "التدريب على برنامج PECS",
        "فنيات التواصل مع أسر الأطفال ذوي الإعاقة",
        "استراتيجيات تعليم ذوي الاحتياجات الخاصة وتدريبهم",
        "استراتيجيات مهارات الاتصال",
        "استراتيجيات تعديل السلوك",
        "وسائل التواصل الاجتماعي والضبط السلوكي للطلاب",
        "التخطيط الاستراتيجي الشخصي",
        "تدريب المحاولات المنفصلة للتوحد (DTT)",
        "العلاج الجنسي لذوي الإعاقة",
        "القائد المؤثر في الحقل التربوي",
        "القيادات المؤثرة في الإرشاد الطلابي",
        "مقياسا ABLLS وAFLS",
      ],
    },
    tools: {
      text: "دورات حصل عليها في التقييم والتشخيص والتدريب.",
      rows: [
        ["مقياس ستانفورد بينيه للذكاء (الإصدار الخامس)", "ADOS-2 لتشخيص التوحد", "مقياس وكسلر", "مقياس لايتر الأدائي للذكاء", "مقياس السلوك اللفظي VB-MAPP", "مقياس ABLLS", "مقياس AFLS", "مقياس السلوك التكيفي"],
        ["برنامج PECS", "إعداد المدربين TOT", "مدرب دولي من البورد الكندي للتدريب", "إدارة الأزمات لذوي الهمم", "تقييم ذوي الإعاقة وتشخيصهم", "مدرب نطق", "التخطيط الاستراتيجي الشخصي والمؤسسي", "التحليل الإحصائي SPSS", "الرخصة الدولية لقيادة الحاسوب ICDL"],
      ],
    },
    conferences: {
      text: "شارك بأوراق علمية في مؤتمرات وملتقيات في الأردن ومصر وسلطنة عُمان.",
      paperLabel: "ورقة علمية",
      items: [
        { year: 2012, country: "الأردن", title: "مؤتمر التوجهات الحديثة في التربية الخاصة" },
        { year: 2015, country: "الأردن", title: "الملتقى الإقليمي الأول في التوحد: تشخيص طيف التوحد وصعوبات التعلم وعلاجها" },
        { year: 2015, country: "مصر", title: "مؤتمر كلية العريش عن التوحد" },
        { year: 2019, country: "مصر", title: "مؤتمر التأهيل المهني لذوي الإعاقة" },
        { year: 2019, country: "سلطنة عُمان", title: "ملتقى الأمراض النفسية والعصبية، وزارة الصحة العُمانية" },
        { year: 2022, country: "سلطنة عُمان", title: "ملتقى ذوي الإعاقة" },
        { year: 2023, country: "سلطنة عُمان", title: "مؤتمر الطلاب في دور الأيتام ومشكلاتهم السلوكية" },
        { year: 2023, country: "سلطنة عُمان", title: "ملتقى فضاءات ذوي الإعاقة وطاقاتهم الكامنة، جامعة السلطان قابوس" },
      ],
    },
    books: {
      text: "كتابان منشوران، وأربعة كتب قيد الإعداد.",
      publishedLabel: "منشور",
      inProgressLabel: "قيد الإعداد",
      items: [
        { title: "التربية الجنسية للمراهقين ذوي الإعاقة الذهنية والتوحد", published: true },
        { title: "الدليل المنزلي للأسرة في التعامل مع أطفالها من ذوي الإعاقة", published: true },
        { title: "أساسيات علم تحليل السلوك التطبيقي (ABA)", published: false },
        { title: "التربية الخاصة في الإسلام", published: false },
        { title: "التأهيل المهني لذوي الإعاقة", published: false },
        { title: "تدريب ذوي الإعاقة وتأهيلهم في الوطن العربي بين الواقع والمأمول", published: false },
      ],
    },
    strengths: {
      items: [
        "تعدّد التخصصات (العلاج الطبيعي، التربية الخاصة، تحليل السلوك التطبيقي)، وهو أساس النظرة التكاملية للعمل.",
        "قدرة كبيرة على الإشراف والحوار والتدريب والتطوير.",
        "التدريب على كل جديد في مجال الإعاقة واستخدام أحدث الاستراتيجيات.",
        "خبرة واسعة في التحليل السلوكي.",
        "القدرة على تطوير الأداء المؤسسي.",
        "التخطيط الاستراتيجي والإدارة الفنية.",
        "إتقان اللغتين العربية والإنجليزية.",
      ],
    },
    closing: {
      title: "علمٌ يُطبَّق في الميدان",
      text: "خبرة عشرين عامًا، في برامج تدريبية معتمدة يشرف عليها الدكتور موفق عقل بنفسه.",
      primaryAction: { href: "/courses", label: "تصفّح الدورات" },
      secondaryAction: { href: "/contact-us", label: "تواصل معنا" },
    },
  },
  en: {
    metaTitle: "Dr Muaffaq Aqel: Curriculum vitae",
    metaDescription:
      "The CV of Dr Muaffaq Aqel: PhD in special education and rehabilitation, Qualified Behavior Analyst (QBA), and more than 20 years of training and behavioural rehabilitation in Jordan, Oman and the UAE.",
    chaptersLabel: "CV sections",
    chapters: {
      profile: { id: "profile", label: "Profile", kicker: "Profile", title: "Who is Dr Muaffaq Aqel?" },
      qualifications: { id: "qualifications", label: "Qualifications", kicker: "Qualifications", title: "Degrees and international licences" },
      career: { id: "career", label: "Career", kicker: "Career", title: "Twenty years in the field" },
      teaching: { id: "teaching", label: "Teaching", kicker: "Teaching", title: "Diplomas and courses he has taught" },
      tools: { id: "tools", label: "Tools", kicker: "Professional development", title: "Assessments and programmes he is trained in" },
      conferences: { id: "conferences", label: "Conferences", kicker: "Research", title: "Papers at conferences and forums" },
      books: { id: "books", label: "Books", kicker: "Writing", title: "Books and publications" },
      strengths: { id: "strengths", label: "Strengths", kicker: "What he brings", title: "Key strengths" },
    },
    cover: {
      eyebrow: "Curriculum vitae",
      honorific: "Dr",
      name: "Muaffaq Aqel",
      fullName: "Muaffaq Mahmoud Abdel Fattah Aqel",
      role: "PhD in special education and rehabilitation, and board-certified Qualified Behavior Analyst (QBA).",
      facts: [
        { label: "Nationality", value: "Jordanian" },
        { label: "Based in", value: "Oman" },
        { label: "QBA licence", value: "14456" },
      ],
      scrollCue: "Read on",
      image: { src: drPortrait, alt: "Dr Muaffaq Aqel" },
    },
    stats: [
      { value: 20, suffix: "+", label: "years of training and rehabilitation" },
      { value: 100, suffix: "+", label: "specialist training courses taught" },
      { value: 500, suffix: "+", label: "hours of training in QABA programmes" },
      { value: 8, label: "papers at conferences and forums" },
    ],
    intro:
      "For more than twenty years, Dr Muaffaq Aqel has worked across training rooms, rehabilitation centres and universities in Jordan, Oman and the UAE. He brings together physical therapy, special education and Applied Behaviour Analysis, holds international board certification as a behaviour analyst, and gives specialists knowledge they can use in the field, not just on paper.",
    disciplines: {
      title: "Three disciplines, one view",
      text: "He began in physical therapy, went on to special education and rehabilitation up to a doctorate, and then to Applied Behaviour Analysis. So he sees the child, the family and the programme as one picture, not separate parts.",
      fields: ["Physical therapy", "Special education", "Applied Behaviour Analysis"],
      centre: "One integrated view",
    },
    education: {
      title: "Academic path",
      steps: [
        { year: 2003, title: "Diploma in Physical Therapy", place: "Jordanian Ministry of Health" },
        { year: 2007, title: "BSc in Physical Therapy", place: "University of Jordan" },
        { year: 2012, title: "MA in Special Education", place: "Amman Arab University" },
        { year: 2015, title: "PhD in Special Education and Rehabilitation", place: "University of Jordan" },
      ],
    },
    licences: {
      title: "Licences and accreditations",
      numberLabel: "Licence no.",
      items: [
        { year: 2026, title: "Certified trainer in slow learning and specific learning difficulties", issuer: "Jordanian Ministry of Higher Education" },
        { year: 2023, title: "Qualified Behavior Analyst (QBA)", issuer: "QABA", number: "14456" },
        { year: 2023, title: "International Behavior Analyst (IBA)", issuer: "IBAO", number: "10914297" },
        { year: 2020, title: "Certified Leiter-3 trainer", issuer: "Bana Educational Consultancy, the accredited regional office for the Leiter test in the Arab world" },
        { year: 2018, title: "Certified international trainer in autism diagnosis and rehabilitation" },
      ],
    },
    career: {
      text: "Technical expert, behavioural consultant, lecturer and trainer for associations, ministries, colleges and training institutes in three countries.",
      present: "now",
      image: { src: drTeaching, alt: "Dr Muaffaq Aqel teaching a training course" },
      roles: [
        { start: 2025, end: 2026, role: "Trainer", place: "Omani Ministry of Labour and Ministry of Social Development projects preparing special education and vocational rehabilitation specialists for employment", country: "Oman" },
        { start: 2025, end: 2026, role: "Consultant", place: "Behavioural and rehabilitation consulting for several schools", country: "Oman" },
        { start: 2024, end: 2026, role: "International trainer", place: "Impact International Training Institute", country: "UAE" },
        { start: 2022, role: "Trainer in disability, behavioural and educational analysis", place: "Genova Institute for Management Development", country: "UAE" },
        { start: 2020, end: 2025, role: "Consultant", place: "Behavioural and rehabilitation consulting at an orphanage", country: "Oman" },
        { start: 2018, role: "Technical expert and behavioural consultant", place: "Association for Early Intervention for Children with Disabilities", country: "Oman" },
        { start: 2018, end: 2022, role: "Psychological and behavioural consultant", place: "Top Clinic for Psychological and Behavioural Consultations", country: "Oman" },
        { start: 2017, end: 2018, role: "Technical expert and behavioural consultant", place: "Ministry of Social Development, Al Aman Unit for Severe Disabilities", country: "Oman" },
        { start: 2016, end: 2017, role: "Technical expert and behavioural consultant", place: "Association for the Care of Children with Disabilities", country: "Oman" },
        { start: 2014, end: 2016, role: "Trainer in disability, behavioural and educational analysis", place: "Bravo Consulting and Training", country: "Jordan" },
        { start: 2012, end: 2016, role: "Lecturer in special education and rehabilitation", place: "Wadi Al-Seer College, UNRWA", country: "Jordan" },
        { start: 2012, end: 2015, role: "Trainer in disability, behavioural and educational analysis", place: "Make Your Mark Association", country: "Jordan" },
        { start: 2004, end: 2014, role: "Technical manager and behavioural consultant", place: "Hajja Rafiqa Centre for People with Disabilities, for Palestinian refugees", country: "Jordan" },
      ],
    },
    teaching: {
      text: "He has taught more than 100 specialist courses, most of them training diplomas, including:",
      items: [
        "Shadow teacher",
        "Assistant speech trainer and auditory rehabilitation for cochlear implant users",
        "Autism teacher",
        "Special needs trainer",
        "Occupational therapy and sensory integration trainer",
        "Applied Behaviour Analysis (ABA)",
        "Writing educational plans",
        "Training on the VB-MAPP",
        "Training on PECS",
        "Communicating with families of children with disabilities",
        "Strategies for teaching and training people with special needs",
        "Communication skills strategies",
        "Behaviour modification strategies",
        "Social media and behaviour management for students",
        "Personal strategic planning",
        "Discrete Trial Training for autism (DTT)",
        "Sexual therapy for people with disabilities",
        "The influential leader in education",
        "Influential leadership in student counselling",
        "The ABLLS and AFLS assessments",
      ],
    },
    tools: {
      text: "Courses he has completed in assessment, diagnosis and training.",
      rows: [
        ["Stanford-Binet Intelligence Scales, Fifth Edition", "ADOS-2 for autism diagnosis", "Wechsler scales", "Leiter performance scale", "VB-MAPP", "ABLLS", "AFLS", "Adaptive behaviour scale"],
        ["PECS", "Training of Trainers (TOT)", "International trainer, Canadian Board of Training", "Crisis management for people of determination", "Assessing and diagnosing people with disabilities", "Speech trainer", "Personal and institutional strategic planning", "SPSS statistical analysis", "ICDL"],
      ],
    },
    conferences: {
      text: "He has presented papers at conferences and forums in Jordan, Egypt and Oman.",
      paperLabel: "Paper",
      items: [
        { year: 2012, country: "Jordan", title: "Conference on Modern Trends in Special Education" },
        { year: 2015, country: "Jordan", title: "First Regional Forum on Autism: diagnosing and treating autism spectrum disorder and learning difficulties" },
        { year: 2015, country: "Egypt", title: "Al-Arish College conference on autism" },
        { year: 2019, country: "Egypt", title: "Conference on Vocational Rehabilitation for People with Disabilities" },
        { year: 2019, country: "Oman", title: "Forum on Psychological and Neurological Disorders, Omani Ministry of Health" },
        { year: 2022, country: "Oman", title: "People with Disabilities Forum" },
        { year: 2023, country: "Oman", title: "Conference on students in orphanages and their behavioural problems" },
        { year: 2023, country: "Oman", title: "Forum on Spaces for People with Disabilities and their Potential, Sultan Qaboos University" },
      ],
    },
    books: {
      text: "Two published books, and four more in progress.",
      publishedLabel: "Published",
      inProgressLabel: "In progress",
      items: [
        { title: "Sexual Education for Adolescents with Intellectual Disabilities and Autism", published: true },
        { title: "A Home Guide for Families of Children with Disabilities", published: true },
        { title: "Foundations of Applied Behaviour Analysis (ABA)", published: false },
        { title: "Special Education in Islam", published: false },
        { title: "Vocational Rehabilitation for People with Disabilities", published: false },
        { title: "Training and Rehabilitating People with Disabilities in the Arab World: Between Reality and Hope", published: false },
      ],
    },
    strengths: {
      items: [
        "More than one speciality (physical therapy, special education, Applied Behaviour Analysis), the basis of an integrated view of the work.",
        "A strong approach to supervision, dialogue, training and development.",
        "Training on everything new in the disability field, with the latest strategies.",
        "Extensive experience in behaviour analysis.",
        "Developing how institutions perform.",
        "Strategic planning and technical management.",
        "Excellent Arabic and English.",
      ],
    },
    closing: {
      title: "Knowledge you can use in the field",
      text: "Twenty years of experience, in accredited training programmes that Dr Muaffaq Aqel supervises himself.",
      primaryAction: { href: "/courses", label: "Browse courses" },
      secondaryAction: { href: "/contact-us", label: "Contact us" },
    },
  },
};
