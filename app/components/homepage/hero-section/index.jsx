import { personalData } from "@/utils/data/personal-data";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";

function HeroSection() {
  return (
    <section className="relative flex flex-col justify-center py-8 lg:min-h-[calc(100vh-5rem)] lg:py-14">
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
              View Resume
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

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-visual__grid" />
          <div className="hero-orbit hero-orbit--one" />
          <div className="hero-orbit hero-orbit--two" />
          <div className="hero-orbit hero-orbit--three" />

          <div className="hero-core">
            <div className="hero-core__grid" />
            <div className="hero-core__glow" />
          </div>

          <div className="hero-particle hero-particle--one" />
          <div className="hero-particle hero-particle--two" />
          <div className="hero-particle hero-particle--three" />
          <div className="hero-particle hero-particle--four" />
          <div className="hero-cube hero-cube--one" />
          <div className="hero-cube hero-cube--two" />
          <div className="hero-cube hero-cube--three" />
          <div className="hero-label hero-label--one">AI</div>
          <div className="hero-label hero-label--two">DATA</div>
          <div className="hero-label hero-label--three">FINTECH</div>
        </div>
      </div>

      <style jsx>{`
        .hero-visual {
          position: relative;
          isolation: isolate;
          display: flex;
          min-height: 360px;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          perspective: 1100px;
          background:
            radial-gradient(ellipse at 50% 50%, rgba(75, 59, 180, 0.16), transparent 58%),
            radial-gradient(ellipse at 50% 50%, rgba(22, 242, 179, 0.07), transparent 72%);
        }

        .hero-visual__grid {
          position: absolute;
          inset: 8%;
          opacity: 0.2;
          background-image:
            linear-gradient(rgba(105, 125, 255, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(105, 125, 255, 0.12) 1px, transparent 1px);
          background-size: 34px 34px;
          mask-image: radial-gradient(ellipse, #000 12%, transparent 72%);
        }

        .hero-core {
          position: relative;
          z-index: 2;
          width: 190px;
          height: 190px;
          overflow: hidden;
          border: 1px solid rgba(125, 211, 252, 0.58);
          border-radius: 50%;
          transform-style: preserve-3d;
          background:
            radial-gradient(circle at 31% 25%, rgba(167, 139, 250, 0.92), transparent 26%),
            radial-gradient(circle at 65% 70%, rgba(22, 242, 179, 0.32), transparent 38%),
            radial-gradient(circle at 50% 48%, #24245f 0%, #101633 56%, #080d20 82%);
          box-shadow:
            0 0 35px rgba(99, 102, 241, 0.34),
            0 0 90px rgba(22, 242, 179, 0.11),
            inset -18px -16px 35px rgba(2, 6, 23, 0.7),
            inset 10px 8px 25px rgba(196, 181, 253, 0.16);
          animation: core-float 6s ease-in-out infinite;
        }

        .hero-core::before,
        .hero-core::after {
          position: absolute;
          inset: -2%;
          content: "";
          border-radius: 50%;
          pointer-events: none;
        }

        .hero-core::before {
          border: 1px solid rgba(103, 232, 249, 0.5);
          transform: rotateY(62deg) scaleX(0.58);
          box-shadow: 0 0 14px rgba(103, 232, 249, 0.14);
        }

        .hero-core::after {
          border: 1px solid rgba(22, 242, 179, 0.35);
          transform: rotateY(-62deg) scaleX(0.58);
        }

        .hero-core__grid {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          opacity: 0.52;
          background-image:
            repeating-linear-gradient(0deg, transparent 0 15px, rgba(103, 232, 249, 0.22) 16px, transparent 17px),
            repeating-linear-gradient(90deg, transparent 0 15px, rgba(103, 232, 249, 0.18) 16px, transparent 17px);
          mask-image: radial-gradient(circle, #000 26%, transparent 77%);
          animation: grid-drift 12s linear infinite;
        }

        .hero-core__glow {
          position: absolute;
          top: 17%;
          left: 20%;
          width: 34%;
          height: 22%;
          border-radius: 50%;
          background: rgba(224, 231, 255, 0.3);
          filter: blur(17px);
          transform: rotate(-35deg);
        }

        .hero-orbit {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 1;
          border: 1px solid rgba(103, 232, 249, 0.42);
          border-radius: 50%;
          transform-style: preserve-3d;
          pointer-events: none;
        }

        .hero-orbit--one {
          width: 310px;
          height: 132px;
          border-color: rgba(22, 242, 179, 0.55);
          transform: translate(-50%, -50%) rotateX(68deg) rotateZ(-22deg);
          animation: orbit-one 16s linear infinite;
        }

        .hero-orbit--two {
          width: 350px;
          height: 205px;
          border-style: dashed;
          border-color: rgba(167, 139, 250, 0.58);
          transform: translate(-50%, -50%) rotateY(62deg) rotateZ(34deg);
          animation: orbit-two 22s linear infinite;
        }

        .hero-orbit--three {
          width: 285px;
          height: 285px;
          border-color: rgba(96, 165, 250, 0.22);
          transform: translate(-50%, -50%) rotateX(72deg) rotateY(18deg);
          animation: orbit-three 28s linear infinite;
        }

        .hero-particle {
          position: absolute;
          z-index: 3;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #6ee7d0;
          box-shadow: 0 0 15px rgba(22, 242, 179, 0.9);
          animation: particle-pulse 3.5s ease-in-out infinite;
        }

        .hero-particle--one { top: 21%; left: 28%; }
        .hero-particle--two { top: 72%; left: 23%; animation-delay: -1s; }
        .hero-particle--three { top: 24%; right: 23%; animation-delay: -2s; }
        .hero-particle--four { right: 25%; bottom: 18%; animation-delay: -0.5s; }

        .hero-cube {
          position: absolute;
          z-index: 3;
          width: 27px;
          height: 27px;
          border: 1px solid rgba(196, 181, 253, 0.72);
          background: linear-gradient(145deg, rgba(129, 140, 248, 0.22), rgba(22, 242, 179, 0.06));
          box-shadow: 0 0 22px rgba(129, 140, 248, 0.2), inset 0 0 12px rgba(129, 140, 248, 0.14);
          transform-style: preserve-3d;
          animation: cube-drift 8s ease-in-out infinite;
        }

        .hero-cube--one { top: 18%; right: 28%; }
        .hero-cube--two { bottom: 19%; left: 27%; width: 18px; height: 18px; animation-delay: -3s; }
        .hero-cube--three { right: 17%; bottom: 39%; width: 13px; height: 13px; animation-delay: -5s; }

        .hero-label {
          position: absolute;
          z-index: 4;
          padding: 7px 11px;
          border: 1px solid rgba(129, 140, 248, 0.32);
          border-radius: 999px;
          color: rgba(226, 232, 240, 0.82);
          background: rgba(9, 13, 32, 0.58);
          box-shadow: 0 8px 28px rgba(2, 6, 23, 0.22);
          backdrop-filter: blur(8px);
          font: 600 9px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
          letter-spacing: 0.18em;
          animation: label-float 7s ease-in-out infinite;
        }

        .hero-label--one { top: 25%; left: 13%; color: #a5f3e3; }
        .hero-label--two { right: 10%; top: 57%; animation-delay: -2s; }
        .hero-label--three { bottom: 19%; right: 28%; animation-delay: -4s; }

        @keyframes core-float {
          0%, 100% { transform: translateY(0) rotateX(-5deg) rotateY(-10deg); }
          50% { transform: translateY(-12px) rotateX(5deg) rotateY(12deg); }
        }

        @keyframes grid-drift {
          from { transform: rotate(0deg) scale(1.1); }
          to { transform: rotate(360deg) scale(1.1); }
        }

        @keyframes orbit-one {
          from { transform: translate(-50%, -50%) rotateX(68deg) rotateZ(-22deg); }
          to { transform: translate(-50%, -50%) rotateX(68deg) rotateZ(338deg); }
        }

        @keyframes orbit-two {
          from { transform: translate(-50%, -50%) rotateY(62deg) rotateZ(34deg); }
          to { transform: translate(-50%, -50%) rotateY(62deg) rotateZ(-326deg); }
        }

        @keyframes orbit-three {
          from { transform: translate(-50%, -50%) rotateX(72deg) rotateY(18deg); }
          to { transform: translate(-50%, -50%) rotateX(72deg) rotateY(378deg); }
        }

        @keyframes particle-pulse {
          0%, 100% { opacity: 0.45; transform: scale(0.75); }
          50% { opacity: 1; transform: scale(1.35); }
        }

        @keyframes cube-drift {
          0%, 100% { transform: translateY(0) rotateX(12deg) rotateY(28deg) rotateZ(0); }
          50% { transform: translateY(-17px) rotateX(190deg) rotateY(208deg) rotateZ(45deg); }
        }

        @keyframes label-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-9px); }
        }

        @media (min-width: 1024px) {
          .hero-visual { min-height: 500px; }
        }

        @media (max-width: 639px) {
          .hero-visual { min-height: 310px; }
          .hero-core { width: 150px; height: 150px; }
          .hero-orbit--one { width: 255px; height: 110px; }
          .hero-orbit--two { width: 285px; height: 165px; }
          .hero-orbit--three { width: 230px; height: 230px; }
          .hero-label--one { left: 6%; }
          .hero-label--two { right: 5%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-core,
          .hero-core__grid,
          .hero-orbit,
          .hero-particle,
          .hero-cube,
          .hero-label {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

export default HeroSection;
