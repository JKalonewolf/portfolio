import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";

const focusAreas = [
  {
    title: "Business Analysis",
    description: "Requirements, user stories, process understanding and user journeys.",
  },
  {
    title: "Product Analytics",
    description: "KPIs, funnel analysis, cohort analysis and performance dashboards.",
  },
  {
    title: "FinTech & AI",
    description: "Project work across regulatory compliance, digital lending and KYC.",
  },
  {
    title: "Product Delivery",
    description: "PRD/BRD documentation, Agile/Scrum and structured problem-solving.",
  },
];

function AboutSection() {
  return (
    <section id="about" className="relative my-16 scroll-mt-24 lg:my-24">
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#16f2b3]">
          About Me
        </p>
        <h2 className="text-2xl font-bold leading-tight text-white md:text-4xl">
          Connecting business needs with{" "}
          <span className="text-[#16f2b3]">technology and data.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-14">
        <div>
          <p className="text-sm leading-7 text-gray-300 md:text-base md:leading-8">
            {personalData.description}
          </p>

          <div className="mt-8">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-gray-200">
              Areas I work across
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {focusAreas.map((area) => (
                <article
                  key={area.title}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors duration-200 hover:border-[#16f2b3]/40"
                >
                  <h4 className="text-sm font-semibold text-[#16f2b3] md:text-base">
                    {area.title}
                  </h4>
                  <p className="mt-2 text-xs leading-6 text-gray-400 md:text-sm">
                    {area.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <aside className="mx-auto w-full max-w-sm rounded-2xl border border-[#1b2c68a0] bg-gradient-to-br from-[#111a36] to-[#0a0d27] p-5 shadow-xl shadow-violet-950/20">
          <div className="flex justify-center">
            <Image
              src={personalData.profile}
              width={240}
              height={240}
              alt="Portrait of Jayakumar L"
              className="h-52 w-52 rounded-xl object-cover grayscale transition-all duration-700 hover:grayscale-0 md:h-60 md:w-60"
            />
          </div>

          <div className="mt-6 border-t border-white/10 pt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              Education
            </p>
            <div className="mt-4">
              <p className="text-sm font-semibold text-white">
                MBA – Information Technology &amp; FinTech
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Manipal University Jaipur · 2024–2026
              </p>
            </div>
            <div className="mt-4">
              <p className="text-sm font-semibold text-white">
                Bachelor of Computer Applications
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Excel College for Commerce and Science · 2020–2023
              </p>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-10 rounded-xl border border-[#16f2b3]/20 bg-[#16f2b3]/5 px-5 py-4 md:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#16f2b3]">
          My approach
        </p>
        <p className="mt-2 text-sm leading-6 text-gray-200 md:text-base">
          Understand the problem <span className="text-[#16f2b3]">→</span>{" "}
          define the requirements <span className="text-[#16f2b3]">→</span>{" "}
          analyse the data <span className="text-[#16f2b3]">→</span>{" "}
          support better decisions.
        </p>
      </div>
    </section>
  );
}

export default AboutSection;
