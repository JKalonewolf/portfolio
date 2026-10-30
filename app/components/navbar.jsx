"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const navigation = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Education", href: "/#education" },
  { label: "Certifications", href: "/#certifications" },
  { label: "Contact", href: "/#contact" },
  { label: "Blog", href: "/blog" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // If scrolling down more than 10px and beyond top offset (70px), hide navbar
          if (currentScrollY > lastScrollY && currentScrollY > 70) {
            setIsVisible(false);
            setIsOpen(false);
          } else if (currentScrollY < lastScrollY || currentScrollY <= 20) {
            // If scrolling up or near the top, reveal navbar
            setIsVisible(true);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-[100] px-4 pt-3 transition-all duration-300 ease-in-out sm:pt-4 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto flex max-w-[95vw] items-center justify-between rounded-full border border-white/10 bg-[#0d1224]/85 px-2 py-1.5 shadow-2xl shadow-violet-950/20 backdrop-blur-xl transition-colors hover:border-[#16f2b3]/30 sm:max-w-fit sm:px-3">
        {/* Desktop Navigation Links Pill */}
        <nav className="hidden items-center gap-0.5 md:flex lg:gap-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-300 transition-all duration-200 hover:bg-white/10 hover:text-[#16f2b3] lg:px-3.5 lg:text-xs"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex w-44 items-center justify-between px-2 md:hidden">
          <span className="font-mono text-xs uppercase tracking-wider text-[#16f2b3]">
            Navigation
          </span>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-gray-200 transition-colors hover:border-[#16f2b3]/40 hover:text-[#16f2b3]"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <HiX size={18} /> : <HiMenuAlt3 size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="mx-auto mt-2 max-w-xs rounded-2xl border border-white/10 bg-[#0d1224]/95 p-3 shadow-2xl shadow-black/50 backdrop-blur-2xl md:hidden">
          <ul className="flex flex-col gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-300 transition-colors hover:bg-white/5 hover:text-[#16f2b3]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbar;
