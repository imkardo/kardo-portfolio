import { useSiteData } from "@/lib/site-data";

export function Testimonials() {
  const { data } = useSiteData();
  const testimonials = data.testimonials;
  return (
    <section id="testimonials" className="section-padding bg-light-bg dark:bg-dark-bg">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="font-heading mb-4 text-3xl font-bold text-light-text sm:text-4xl md:text-5xl dark:text-dark-text">
            What partners <span className="gradient-text">say</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-light-muted dark:text-dark-muted">
            From the people who had to live with the systems after I left the room.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote key={item.id} className="glass-card flex flex-col p-6 md:p-8">
              <p className="flex-1 text-base leading-relaxed text-light-text dark:text-dark-text">
                “{item.quote}”
              </p>
              <footer className="mt-6">
                <div className="font-heading font-semibold text-light-text dark:text-dark-text">
                  {item.name}
                </div>
                <div className="text-sm text-light-muted dark:text-dark-muted">
                  {item.role}, {item.company}
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
