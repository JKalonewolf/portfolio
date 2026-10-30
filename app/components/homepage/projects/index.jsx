import { projectsData } from "@/utils/data/projects-data";
import ProjectCard from "./project-card";

const Projects = () => {
  return (
    <section id="projects" className="relative z-10 scroll-mt-20 border-t border-[#25213b] py-10 sm:py-12 lg:py-14">
      <div className="mx-auto mb-8 sm:mb-10 max-w-3xl text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Selected <span className="text-[#16f2b3]">Work &amp; Projects</span>
        </h2>
        <p className="mt-2 text-sm leading-7 text-gray-400 md:text-base">
          A selection of business analysis, product, data, FinTech and AI projects.
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
