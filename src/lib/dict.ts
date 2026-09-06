import type { Lang } from "./i18n";

export const ui = {
  en: {
    nav: {
      hireMe: "Hire Me",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      hireMe: "Hire Me",
      viewWork: "View Work",
      taglineSuffix: "Previously web development — now Python, foundations, and AI.",
    },
    about: {
      eyebrow: "About",
      titleA: "A developer who still",
      titleB: "writes the code",
      based: "Based",
      status: "Status",
      contact: "Contact",
    },
    services: {
      titleA: "Everything You Need for",
      titleB: "Serious Software",
      subtitle:
        "A compact practice covering the work that actually moves a product: architecture, interface, delivery, and the operational layer underneath.",
    },
    stacks: {
      title: (n: number) => `${n} Stacks I Ship With`,
      titleAccent: "Ship With",
      subtitle:
        "Framework-specific taste, not a laundry list. The tools I reach for when the work has to last.",
    },
    process: {
      titleA: "How It",
      titleB: "Works",
      subtitle: "From a one-page brief to production-ready software in six deliberate steps.",
    },
    projects: {
      titleA: "Selected",
      titleB: "Projects",
      subtitle: "A few systems I designed, built, and left in a state a team can actually run.",
      all: "All",
    },
    gallery: {
      titleA: "Interface",
      titleB: "Gallery",
      subtitle:
        "Fragments from shipped work — dashboards, ledgers, and the quiet surfaces operators live in.",
      close: "Close gallery",
    },
    resume: {
      titleA: "Resume &",
      titleB: "Skills",
      subtitle: "A short history of ownership, plus the tools I keep sharp.",
    },
    cta: {
      titleA: "Ready to ship",
      titleB: "something durable?",
      subtitle:
        "I take a small number of collaborations at a time. If the problem is real and the constraints are honest, let's talk.",
      hire: (name: string) => `Hire ${name}`,
      emailInstead: "Email instead",
      badges: ["Independent", "Remote-first", "Production-minded"] as string[],
    },
    contact: {
      titleA: "Let's build something",
      titleB: "worth running",
      subtitle:
        "Tell me about the system, the constraint, and the date it needs to be real. I read every note.",
      email: "Email",
      location: "Location",
      availability: "Availability",
      name: "Name",
      emailField: "Email",
      projectType: "Project type",
      budget: "Budget",
      message: "Message",
      projectOptions: ["Platform / backend", "Product / full-stack", "Design system", "Advisory"] as string[],
      budgetOptions: ["Still scoping", "Under $20k", "$20k – $60k", "$60k+"] as string[],
      requiredError: "Name, email, and a short note are required.",
      invalidEmailError: "Please use a valid email address.",
      saveError: "Could not save the note locally. Try email instead.",
      send: "Send message",
      received: "Note received.",
      receivedBody: (email: string) =>
        `I'll reply to the address you left. If it's urgent, email ${email} directly.`,
      sendAnother: "Send another",
    },
    footer: {
      tagline: "Python developer moving from web into AI — foundations first, shipped work always.",
      navigate: "Navigate",
      practice: "Practice",
      connect: "Connect",
      status: "Status",
      hireMe: "Hire Me",
      resume: "Resume",
      builtWith: "Built with React + Tailwind CSS (by",
      practiceLine: "Independent engineering practice",
    },
  },
  fa: {
    nav: {
      hireMe: "استخدامم کن",
      openMenu: "باز کردن منو",
      closeMenu: "بستن منو",
    },
    hero: {
      hireMe: "استخدامم کن",
      viewWork: "مشاهده نمونه‌کارها",
      taglineSuffix: "قبلاً توسعه وب — حالا پایتون، مبانی و هوش مصنوعی.",
    },
    about: {
      eyebrow: "درباره من",
      titleA: "توسعه‌دهنده‌ای که هنوز",
      titleB: "خودش کد می‌زند",
      based: "موقعیت",
      status: "وضعیت",
      contact: "تماس",
    },
    services: {
      titleA: "هرچه برای",
      titleB: "نرم‌افزار جدی لازم است",
      subtitle:
        "مجموعه‌ای فشرده از کارهایی که واقعاً یک محصول را جلو می‌برد: معماری، رابط کاربری، تحویل و لایه عملیاتی زیر آن.",
    },
    stacks: {
      title: (n: number) => `${n} تکنولوژی که با آن کار می‌کنم`,
      titleAccent: "کار می‌کنم",
      subtitle: "سلیقه تخصصی در فریمورک‌ها، نه فهرست بلندبالا. ابزارهایی که وقتی کار باید ماندگار باشد به سراغشان می‌روم.",
    },
    process: {
      titleA: "نحوه",
      titleB: "همکاری",
      subtitle: "از یک بریف یک‌صفحه‌ای تا نرم‌افزار آماده تولید، در شش قدم حساب‌شده.",
    },
    projects: {
      titleA: "پروژه‌های",
      titleB: "منتخب",
      subtitle: "چند سیستمی که طراحی، پیاده‌سازی و در وضعیتی تحویل دادم که یک تیم واقعاً بتواند آن را اجرا کند.",
      all: "همه",
    },
    gallery: {
      titleA: "گالری",
      titleB: "رابط‌ها",
      subtitle: "برش‌هایی از کارهای تحویل‌شده — داشبوردها، لجرها و سطح‌های آرامی که اپراتورها در آن زندگی می‌کنند.",
      close: "بستن گالری",
    },
    resume: {
      titleA: "رزومه و",
      titleB: "مهارت‌ها",
      subtitle: "تاریخچه‌ای کوتاه از مسئولیت‌ها، به‌علاوه ابزارهایی که تیز نگهشان می‌دارم.",
    },
    cta: {
      titleA: "آماده‌ای چیزی",
      titleB: "ماندگار بسازیم؟",
      subtitle:
        "در هر بازه تعداد کمی همکاری می‌پذیرم. اگر مسئله واقعی است و محدودیت‌ها صادقانه‌اند، صحبت کنیم.",
      hire: (name: string) => `استخدام ${name}`,
      emailInstead: "ارسال ایمیل",
      badges: ["مستقل", "ریموت‌فرست", "تولیدمحور"] as string[],
    },
    contact: {
      titleA: "بیا چیزی بسازیم که",
      titleB: "ارزش اجرا داشته باشد",
      subtitle: "درباره سیستم، محدودیت و تاریخی که باید واقعی شود بگو. همه پیام‌ها را می‌خوانم.",
      email: "ایمیل",
      location: "موقعیت",
      availability: "وضعیت",
      name: "نام",
      emailField: "ایمیل",
      projectType: "نوع پروژه",
      budget: "بودجه",
      message: "پیام",
      projectOptions: ["پلتفرم / بک‌اند", "محصول / فول‌استک", "دیزاین‌سیستم", "مشاوره"] as string[],
      budgetOptions: ["هنوز در حال بررسی", "زیر ۲۰ هزار دلار", "۲۰ تا ۶۰ هزار دلار", "بالای ۶۰ هزار دلار"] as string[],
      requiredError: "نام، ایمیل و یک پیام کوتاه الزامی است.",
      invalidEmailError: "لطفاً یک ایمیل معتبر وارد کن.",
      saveError: "ذخیره پیام ممکن نشد. مستقیم ایمیل بزن.",
      send: "ارسال پیام",
      received: "پیام دریافت شد.",
      receivedBody: (email: string) => `به همان ایمیلی که گذاشتی جواب می‌دهم. اگر فوری است، مستقیم به ${email} ایمیل بزن.`,
      sendAnother: "ارسال پیام دیگر",
    },
    footer: {
      tagline: "توسعه‌دهنده پایتون در مسیر وب به هوش مصنوعی — اول مبانی، همیشه کار تحویل‌شده.",
      navigate: "دسترسی",
      practice: "فعالیت",
      connect: "ارتباط",
      status: "وضعیت",
      hireMe: "استخدامم کن",
      resume: "رزومه",
      builtWith: "ساخته‌شده با React و Tailwind ‏(توسط",
      practiceLine: "فعالیت مهندسی مستقل",
    },
  },
} as const;

export type UiDict = (typeof ui)["en"];

export function t(lang: Lang): UiDict {
  return ui[lang] as unknown as UiDict;
}
