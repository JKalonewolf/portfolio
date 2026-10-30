const skillGroups = [
  {
    title: "Business & Product Analysis",
    subtitle: "Turning business needs into structured product decisions",
    skills: [
      "Requirement Gathering",
      "PRD / BRD",
      "User Stories",
      "Agile / Scrum",
      "Product Lifecycle",
      "Stakeholder Management",
      "User Research",
      "Process & User Journey Mapping",
      "Roadmap Planning",
      "Competitive Analysis",
    ],
  },
  {
    title: "Data & Product Analytics",
    subtitle: "Measuring performance and finding actionable insights",
    skills: [
      "SQL",
      "Python",
      "Microsoft Excel",
      "Power BI",
      "DAX",
      "KPI Tracking",
      "Funnel Analysis",
      "Cohort Analysis",
      "Dashboard Development",
      "A/B Testing",
      "Data-Driven Decision Making",
    ],
  },
  {
    title: "Tools & Platforms",
    subtitle: "Tools used across analysis, design and collaboration",
    skills: [
      "Jira",
      "Figma",
      "Notion",
      "Google Analytics",
      "Mixpanel",
      "Tableau",
    ],
  },
  {
    title: "Technology, FinTech & AI",
    subtitle: "Technical foundations from hands-on project work",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "AWS",
      "Microsoft Azure",
      "REST APIs",
      "React",
      "Node.js",
      "FastAPI",
      "Docker",
      "Kubernetes",
      "RAG",
      "LangChain",
      "LangGraph",
      "Blockchain / Solidity",
    ],
  },
];

function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-20 border-t border-[#25213b] py-10 sm:py-12 lg:py-14">
      <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-40 w-40 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="mx-auto mb-8 sm:mb-10 max-w-3xl text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Skills &amp; <span className="text-[#16f2b3]">Capabilities</span>
        </h2>
        <p className="mt-2 text-sm leading-7 text-gray-400 md:text-base">
          A mix of business analysis, product analytics, and technical capabilities.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {skillGroups.map((group, index) => (
          <article
            key={group.title}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#111a36] to-[#0b1026] p-5 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-[#16f2b3]/40 md:p-6"
          >
            <div className="mb-5 flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#16f2b3]/30 bg-[#16f2b3]/10 text-sm font-bold text-[#16f2b3]">
                0{index + 1}
              </span>
              <div>
                <h3 className="text-base font-semibold text-white md:text-lg">
                  {group.title}
                </h3>
                <p className="mt-1 text-xs leading-5 text-gray-400 md:text-sm">
                  {group.subtitle}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-200 transition-colors duration-200 hover:border-violet-400/60 hover:text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Skills;
