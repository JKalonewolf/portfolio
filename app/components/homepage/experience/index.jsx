import { experiences } from "@/utils/data/experience";
import { BsPersonWorkspace } from "react-icons/bs";

function Experience() {
  return (
    <section
      id="experience"
      className="relative my-16 scroll-mt-24 border-t border-[#25213b] py-12 lg:my-24 lg:py-16"
    >
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#16f2b3]">
          Professional Experience
        </p>
        <h2 className="text-2xl font-bold text-white md:text-4xl">
          Where I&apos;ve <span className="text-[#16f2b3]">worked and contributed.</span>
        </h2>
        <p className="mt-4 text-sm leading-7 text-gray-400 md:text-base">
          My professional internship experience, separate from academic and portfolio projects.
        </p>
      </div>

      <div className="mx-auto max-w-4xl space-y-5">
        {experiences.map((experience) => (
          <article
            key={experience.id}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#111a36] to-[#0b1026] p-5 shadow-xl shadow-black/10 md:p-8"
          >
            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative flex flex-col gap-5 md:flex-row md:gap-7">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#16f2b3]/25 bg-[#16f2b3]/10 text-[#16f2b3]">
                <BsPersonWorkspace size={28} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-white md:text-xl">
                      {experience.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-[#16f2b3]">
                      {experience.company}
                    </p>
                  </div>
                  <span className="w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300">
                    {experience.duration}
                  </span>
                </div>

                <ul className="mt-5 space-y-3">
                  {experience.details.map((detail) => (
                    <li key={detail} className="flex gap-3 text-sm leading-7 text-gray-300">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#16f2b3]" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
                  {experience.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Experience;
