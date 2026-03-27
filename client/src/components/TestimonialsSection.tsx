import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "I was completely overwhelmed by Medicare options when I turned 65. The guides on this site helped me understand exactly what I needed before I ever spoke to an agent.",
    name: "Margaret T.",
    label: "New to Medicare",
    labelColor: "#0D9488",
    stars: 5,
  },
  {
    quote:
      "I kept working past 65 and had no idea how Medicare interacted with my employer plan. The 'Working Past 65' section answered every question I had.",
    name: "Robert K.",
    label: "Working Past 65",
    labelColor: "#D97706",
    stars: 5,
  },
  {
    quote:
      "Switched from Plan F to Plan G and saved over $80/month. The comparison page made it so clear I didn't even need to call anyone.",
    name: "Linda M.",
    label: "Already Enrolled",
    labelColor: "#4F46E5",
    stars: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-[#F5F7FA] py-16 md:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-[#C41230] font-semibold text-sm mb-3">
            <span className="w-6 h-px bg-[#C41230]" />
            REAL STORIES
            <span className="w-6 h-px bg-[#C41230]" />
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-[34px] font-extrabold text-[#1B2A4A] mb-4">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="bg-white rounded-xl p-6 border border-[#E5E7EB] relative"
            >
              <Quote className="w-8 h-8 text-[#E5E7EB] absolute top-5 right-5" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]"
                  />
                ))}
              </div>
              <p className="text-[#4B5563] text-[15px] leading-relaxed mb-5 italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#1B2A4A] text-sm">
                  {testimonial.name}
                </span>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: `${testimonial.labelColor}10`,
                    color: testimonial.labelColor,
                  }}
                >
                  {testimonial.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
