import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import Hero3DVisual from "@/app/components/helper/hero-3d-visual";

function HeroSection() {
  return (
    <section className="relative flex flex-col justify-center pt-2 pb-6 sm:pt-4 sm:pb-8 lg:pt-6 lg:pb-10">
      {/* Ambient background aura with feathered radial mask to eliminate any hard lines */}
      <div
        className="pointer-events-none absolute -top-16 left-1/2 -z-10 w-full max-w-[1572px] -translate-x-1/2 opacity-50"
        style={{
          maskImage:
            "radial-gradient(ellipse 75% 60% at 50% 35%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 60% at 50% 35%, black 20%, transparent 75%)",
        }}
      >
        <Image
          src="/hero.svg"
          alt=""
          width={1572}
          height={795}
          priority
          className="h-auto w-full"
        />
      </div>

      {/* Smooth bottom blend overlay into the page background */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-[#0d1224] to-transparent" />

      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col items-start p-1 sm:p-2">
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Hi, I&apos;m{" "}
            <span className="text-pink-500">{personalData.name}.</span>
          </h1>

          <h2 className="mt-4 text-lg font-semibold leading-snug text-[#16f2b3] sm:text-xl md:text-2xl">
            {personalData.designation}
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-gray-300 md:text-base">
            MBA graduate in IT &amp; FinTech with a BCA background. I turn
            business problems into clear requirements, user journeys and
            data-informed solutions, with project experience across FinTech,
            AI and product analytics.
          </p>

          <div className="mt-7 flex flex-nowrap items-center gap-1.5 sm:gap-2.5 md:gap-3 max-w-full">
            <Link
              href="#projects"
              className="inline-flex shrink-0 items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-white transition-transform duration-200 hover:-translate-y-0.5 sm:px-4 sm:py-2.5 sm:text-xs md:px-5 md:py-3 md:text-sm"
            >
              Explore Projects
            </Link>

            <Link
              href={personalData.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap rounded-full border border-[#16f2b3]/60 bg-[#16f2b3]/5 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-[#16f2b3]/15 sm:px-4 sm:py-2.5 sm:text-xs md:px-5 md:py-3 md:text-sm"
            >
              View Resume
              <MdDownload size={15} />
            </Link>

            <Link
              href="#contact"
              className="inline-flex shrink-0 items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap rounded-full border border-violet-500/60 bg-violet-500/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-violet-500/20 sm:px-4 sm:py-2.5 sm:text-xs md:px-5 md:py-3 md:text-sm"
            >
              Contact Me
              <RiContactsFill size={14} />
            </Link>
          </div>
        </div>

        <div className="flex w-full items-center justify-center">
          <Hero3DVisual />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
