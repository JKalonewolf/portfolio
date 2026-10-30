import Link from "next/link";
import { personalData } from "@/utils/data/personal-data";
import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

function Footer() {
  return (
    <footer className="relative mt-16 border-t border-[#353951] bg-[#0d1224] text-white">
      <div className="mx-auto px-4 py-8 sm:px-8 md:px-10 lg:max-w-[70rem] lg:px-12 lg:py-10 xl:max-w-[76rem] 2xl:max-w-[92rem]">
        <div className="mb-6 flex justify-center">
          <div className="h-px w-1/2 bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
        </div>

        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} All rights reserved by Jayakumar.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link
              href={`mailto:${personalData.email}`}
              className="inline-flex items-center gap-2 text-gray-300 transition-colors hover:text-[#16f2b3]"
            >
              <FiMail size={16} /> Email
            </Link>
            <Link
              href={personalData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-300 transition-colors hover:text-[#16f2b3]"
            >
              <FiGithub size={16} /> GitHub
            </Link>
            <Link
              href={personalData.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-300 transition-colors hover:text-[#16f2b3]"
            >
              <FiLinkedin size={16} /> LinkedIn
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-2 text-gray-300 transition-colors hover:text-[#16f2b3]"
            >
              Back to top <FiArrowUp size={16} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
