import { personalData } from "@/utils/data/personal-data";
import Link from "next/link";
import { BiLogoLinkedin } from "react-icons/bi";
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import ContactForm from "./contact-form";

function ContactSection() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-20 border-t border-[#25213b] py-10 sm:py-12 lg:py-14 text-white"
    >
      <div className="mx-auto mb-8 sm:mb-10 max-w-3xl text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Get in <span className="text-[#16f2b3]">Touch</span>
        </h2>
        <p className="mt-2 text-sm leading-7 text-gray-400 md:text-base">
          Let&apos;s connect and discuss roles, projects or collaboration opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#111a36] to-[#0b1026] p-5 shadow-xl shadow-black/10 md:p-7">
          <ContactForm />
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#111a36] to-[#0b1026] p-5 md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              Contact details
            </p>

            <div className="mt-5 space-y-4">
              <Link
                href={`mailto:${personalData.email}`}
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-[#16f2b3]/40"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#16f2b3]/10 text-[#16f2b3]">
                  <MdAlternateEmail size={23} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-gray-400">Email</span>
                  <span className="mt-1 block break-all text-sm font-medium text-white group-hover:text-[#16f2b3]">
                    {personalData.email}
                  </span>
                </span>
              </Link>

              <Link
                href={`tel:+91${personalData.phone}`}
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-[#16f2b3]/40"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#16f2b3]/10 text-[#16f2b3]">
                  <IoMdCall size={23} />
                </span>
                <span>
                  <span className="block text-xs text-gray-400">Phone</span>
                  <span className="mt-1 block text-sm font-medium text-white group-hover:text-[#16f2b3]">
                    +91 {personalData.phone}
                  </span>
                </span>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#111a36] to-[#0b1026] p-5 md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              Find me online
            </p>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Link
                href={personalData.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-gray-200 transition-colors hover:border-[#16f2b3]/40 hover:text-[#16f2b3]"
              >
                <BiLogoLinkedin size={21} />
                LinkedIn
              </Link>
              <Link
                href={personalData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-gray-200 transition-colors hover:border-[#16f2b3]/40 hover:text-[#16f2b3]"
              >
                <IoLogoGithub size={21} />
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
