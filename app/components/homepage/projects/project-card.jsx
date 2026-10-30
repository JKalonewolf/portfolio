import Link from "next/link";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";

function ProjectCard({ project }) {
  return (
    <article
      className={`group flex h-full flex-col rounded-2xl border bg-gradient-to-br from-[#111a36] to-[#0b1026] p-5 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-[#16f2b3]/40 md:p-6 ${
        project.featured
          ? "border-[#16f2b3]/30"
          : "border-white/10"
      }`}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full border border-[#16f2b3]/25 bg-[#16f2b3]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#16f2b3]">
          {project.category}
        </span>
        <span className="text-[11px] text-gray-400">{project.status}</span>
      </div>

      <h3 className="text-lg font-semibold leading-snug text-white md:text-xl">
        {project.name}
      </h3>

      <p className="mt-3 text-sm leading-7 text-gray-300">
        {project.description}
      </p>

      <div className="mt-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
          Contributions
        </p>
        <ul className="space-y-2">
          {project.contributions.map((item) => (
            <li key={item} className="flex gap-2 text-xs leading-6 text-gray-300 md:text-sm">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#16f2b3]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
          Role
        </p>
        <p className="text-xs leading-6 text-gray-300 md:text-sm">{project.role}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tools.map((tool) => (
          <span
            key={tool}
            className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-gray-300"
          >
            {tool}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap gap-3 border-t border-white/10 pt-5">
        {project.code ? (
          <Link
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#16f2b3] transition-colors hover:text-white"
          >
            <FiGithub size={17} />
            View source
            <FiArrowUpRight size={15} />
          </Link>
        ) : (
          <span className="text-xs text-gray-400">
            Documentation and analysis artefacts available as a portfolio case study
          </span>
        )}
        {project.demo ? (
          <Link
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-200 transition-colors hover:text-[#16f2b3]"
          >
            Live demo <FiArrowUpRight size={15} />
          </Link>
        ) : null}
      </div>
    </article>
  );
}

export default ProjectCard;
