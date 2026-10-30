import { projectsData } from "@/utils/data/projects-data";
import ProjectCard from "./project-card";

const Projects = () => {
  return (
    <section id="projects" className="relative z-10 my-16 scroll-mt-24 lg:my-24">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#16f2b3]">
          Selected Work
        </p>
        <h2 className="text-2xl font-bold text-white md:text-4xl">
          Projects that connect <span className="text-[#16f2b3]">business and technology.</span>
        </h2>
        <p className="mt-4 text-sm leading-7 text-gray-400 md:text-base">
          A selection of business analysis, product, data, FinTech and AI projects.
          Each project highlights the problem, my contribution and the tools used.
        </p>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2">
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
