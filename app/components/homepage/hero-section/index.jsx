import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";

function HeroSection() {
  return (
    <section className="relative flex flex-col justify-center py-8 lg:min-h-[calc(100vh-5rem)] lg:py-14">
      <Image
        src="/hero.svg"
        alt=""
        width={1572}
        height={795}
        priority
        className="pointer-events-none absolute -top-[98px] -z-10 opacity-70"
      />

      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col items-start p-2">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#16f2b3] md:text-sm">
            Business Analysis · Product Analytics · FinTech
          </p>

          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Hi, I&apos;m{" "}
            <span className="text-pink-500">{personalData.name}.</span>
          </h1>

          <h2 className="mt-5 text-xl font-semibold leading-snug text-[#16f2b3] md:text-2xl">
            {personalData.designation}
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-gray-300 md:text-base">
            MBA graduate in IT &amp; FinTech with a BCA background. I turn
            business problems into clear requirements, user journeys and
            data-informed solutions, with project experience across FinTech,
            AI and product analytics.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-transform duration-200 hover:-translate-y-0.5 md:text-sm"
            >
              Explore Projects
            </Link>

            <Link
              href={personalData.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#16f2b3]/60 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-[#16f2b3]/10 md:text-sm"
            >
              Download Resume
              <MdDownload size={18} />
            </Link>

            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-300 transition-colors duration-200 hover:text-[#16f2b3] md:text-sm"
            >
              Contact Me
              <RiContactsFill size={16} />
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-5">
            <Link
              href={personalData.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open GitHub profile"
              className="text-pink-500 transition-transform duration-300 hover:scale-125"
            >
              <BsGithub size={26} />
            </Link>
            <Link
              href={personalData.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open LinkedIn profile"
              className="text-pink-500 transition-transform duration-300 hover:scale-125"
            >
              <BsLinkedin size={26} />
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-[#1b2c68a0] bg-gradient-to-br from-[#111a36] to-[#0a0d27] shadow-2xl shadow-violet-950/20">
          <div className="flex items-center gap-2 border-b border-indigo-900/80 px-5 py-4">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-orange-400" />
            <span className="h-3 w-3 rounded-full bg-green-300" />
            <span className="ml-3 text-xs text-gray-400">profile.js</span>
          </div>

          <div className="overflow-x-auto px-5 py-7 md:px-7">
            <code className="block whitespace-nowrap font-mono text-xs leading-8 md:text-sm">
              <div>
                <span className="text-pink-400">const</span>{" "}
                <span className="text-white">profile</span>{" "}
                <span className="text-pink-400">=</span>{" "}
                <span className="text-gray-400">{"{"}</span>
              </div>
              <div className="pl-5">
                <span className="text-[#16f2b3]">role</span>
                <span className="text-gray-400">: </span>
                <span className="text-amber-300">&quot;Business &amp; Product Analysis&quot;</span>
                <span className="text-gray-400">,</span>
              </div>
              <div className="pl-5">
                <span className="text-[#16f2b3]">focus</span>
                <span className="text-gray-400">: [</span>
                <span className="text-amber-300">&quot;FinTech&quot;</span>
                <span className="text-gray-400">, </span>
                <span className="text-amber-300">&quot;AI&quot;</span>
                <span className="text-gray-400">, </span>
                <span className="text-amber-300">&quot;Data Analytics&quot;</span>
                <span className="text-gray-400">],</span>
              </div>
              <div className="pl-5">
                <span className="text-[#16f2b3]">toolkit</span>
                <span className="text-gray-400">: [</span>
                <span className="text-amber-300">&quot;SQL&quot;</span>
                <span className="text-gray-400">, </span>
                <span className="text-amber-300">&quot;Power BI&quot;</span>
                <span className="text-gray-400">, </span>
                <span className="text-amber-300">&quot;Python&quot;</span>
                <span className="text-gray-400">, </span>
                <span className="text-amber-300">&quot;Jira&quot;</span>
                <span className="text-gray-400">],</span>
              </div>
              <div className="pl-5">
                <span className="text-[#16f2b3]">approach</span>
                <span className="text-gray-400">: </span>
                <span className="text-amber-300">&quot;Understand → Define → Analyse → Improve&quot;</span>
              </div>
              <div>
                <span className="text-gray-400">{"};"}</span>
              </div>
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;