import { educations } from "@/utils/data/educations";
import { FaGraduationCap } from "react-icons/fa";

function Education() {
  return (
    <section
      id="education"
      className="relative scroll-mt-20 border-t border-[#25213b] py-10 sm:py-12 lg:py-14"
    >
      <div className="mx-auto mb-8 sm:mb-10 max-w-3xl text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Academic <span className="text-[#16f2b3]">Education</span>
        </h2>
        <p className="mt-2 text-sm leading-7 text-gray-400 md:text-base">
          Business, FinTech and computer applications educational background.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
        {educations.map((education, index) => (
          <article
            key={education.id}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#111a36] to-[#0b1026] p-6 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-[#16f2b3]/40 md:p-7"
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />
            <div className="relative">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#16f2b3]/25 bg-[#16f2b3]/10 text-[#16f2b3]">
                  <FaGraduationCap size={25} />
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300">
                  {education.duration}
                </span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#16f2b3]">
                {index === 0 ? "Postgraduate" : "Undergraduate"}
              </p>
              <h3 className="mt-3 text-lg font-semibold leading-snug text-white md:text-xl">
                {education.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-gray-300">{education.institution}</p>
              {education.mode ? (
                <p className="mt-1 text-xs text-gray-400">Mode: {education.mode}</p>
              ) : null}
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                  CGPA
                </p>
                <p className="mt-1 text-2xl font-bold text-white">{education.CGPA}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Education;
