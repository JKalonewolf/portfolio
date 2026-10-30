"use client";

import { useState } from "react";
import Link from "next/link";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const navigation = [
  { label: "ABOUT", href: "/#about" },
  { label: "EXPERIENCE", href: "/#experience" },
  { label: "SKILLS", href: "/#skills" },
  { label: "PROJECTS", href: "/#projects" },
  { label: "EDUCATION", href: "/#education" },
  { label: "CERTIFICATIONS", href: "/#certifications" },
  { label: "CONTACT", href: "/#contact" },
  { label: "BLOG", href: "/blog" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-[100] border-b border-white/5 bg-[#0d1224]/90 backdrop-blur-xl">
      <div className="relative mx-auto flex max-w-screen-xl items-center justify-end py-4">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-gray-200 transition-colors hover:border-[#16f2b3]/40 hover:text-[#16f2b3] md:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="portfolio-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <HiX size={23} /> : <HiMenuAlt3 size={23} />}
        </button>

        <div
          id="portfolio-navigation"
          className={`${isOpen ? "block" : "hidden"} absolute left-0 right-0 top-full mt-3 rounded-xl border border-white/10 bg-[#10172d] p-3 shadow-2xl shadow-black/30 md:static md:mt-0 md:block md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          <ul className="flex flex-col gap-1 md:flex-row md:items-center md:gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-3 py-2 text-xs font-semibold tracking-wide text-gray-300 transition-colors hover:bg-white/5 hover:text-[#16f2b3] md:px-2 lg:px-3"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
