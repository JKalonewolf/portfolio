// @flow strict
import Link from 'next/link';
import { personalData } from "@/utils/data/personal-data";

function Footer() {
  return (
    <footer className="relative border-t border-[#353951] bg-[#0d1224] text-white">
      <div className="mx-auto px-6 py-6 sm:px-12 lg:max-w-[70rem] lg:py-10 xl:max-w-[76rem] 2xl:max-w-[92rem]">
        <div className="flex justify-center">
          <div className="absolute top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-300">
            © {new Date().getFullYear()}{" "}
            <span className="text-[#16f2b3]">Jayakumar L</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-sm">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={personalData.github}
              className="transition-colors hover:text-[#16f2b3]"
            >
              GitHub
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={personalData.linkedIn}
              className="transition-colors hover:text-[#16f2b3]"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;