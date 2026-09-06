export const projects = [
  {
    id: "react-ui",
    title: "سایت مارکتینگ با React",
    category: "رابط کاربری",
    year: "2023",
    summary:
      "سایت مارکتینگ ریسپانسیو با React و Tailwind — چیدمان کامپوننت‌محور با بخش‌های محتوایی APIمحور.",
    outcome: "تحویل‌شده · ریسپانسیو · کامپوننت‌محور",
    stack: ["React", "Tailwind CSS", "JavaScript"],
    href: "#gallery",
    accent: "blue",
  },
  {
    id: "laravel-api",
    title: "بک‌اند REST با لاراول",
    category: "پلتفرم",
    year: "2023",
    summary:
      "منطق بک‌اند و اندپوینت‌های REST با PHP و لاراول روی MySQL — احراز هویت، اعتبارسنجی و پاسخ‌های JSON تمیز.",
    outcome: "تحویل‌شده · REST · اعتبارسنجی‌شده",
    stack: ["PHP", "Laravel", "MySQL"],
    href: "#gallery",
    accent: "amber",
  },
  {
    id: "wordpress-site",
    title: "سایت شرکتی وردپرسی",
    category: "محصول",
    year: "2022",
    summary:
      "سایت شرکتی CMSمحور با وردپرس — راه‌اندازی قالب، ساختار محتوا و سفارشی‌سازی‌های کاربردی.",
    outcome: "تحویل‌شده · CMS · قابل نگهداری",
    stack: ["WordPress", "PHP", "MySQL"],
    href: "#gallery",
    accent: "slate",
  },
  {
    id: "php-mysql",
    title: "اپ PHP و MySQL",
    category: "پلتفرم",
    year: "2022",
    summary:
      "وب‌اپ سمت سرور با PHP و MariaDB — فرم‌ها، سشن‌ها، عملیات CRUD دیتابیس و استقرار روی لینوکس.",
    outcome: "تحویل‌شده · CRUD · میزبانی لینوکس",
    stack: ["PHP", "MariaDB", "Linux"],
    href: "#gallery",
    accent: "blue",
  },
  {
    id: "api-integration",
    title: "فرانت‌اند متصل به API",
    category: "محصول",
    year: "2023",
    summary:
      "فرانت‌اند React متصل به REST API با مدیریت استیت — حالت‌های لودینگ، مدیریت خطا و گردش کار مبتنی بر گیت.",
    outcome: "تحویل‌شده · APIمحور · فلوی تست‌شده",
    stack: ["React", "REST APIs", "Git"],
    href: "#gallery",
    accent: "amber",
  },
  {
    id: "python-start",
    title: "پروژه‌های یادگیری پایتون",
    category: "زیرساخت",
    year: "2024",
    summary:
      "کار جاری: اسکریپت‌ها و برنامه‌های کوچک پایتون درباره OOP‏، مبانی تحلیل داده و تمرین الگوریتم.",
    outcome: "در حال انجام · OOP · مبانی داده",
    stack: ["Python", "Git", "Linux"],
    href: "#gallery",
    accent: "slate",
  },
];

export const projectFilters = ["همه", "پلتفرم", "محصول", "زیرساخت", "رابط کاربری"] as const;
