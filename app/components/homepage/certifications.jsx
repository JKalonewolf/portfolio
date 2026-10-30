import Link from "next/link";
import { certifications } from "@/utils/data/certifications";
import { FaAward } from "react-icons/fa";
import { HiExternalLink } from "react-icons/hi";

function Certifications() {
  return (
    <section
      id="certifications"
      className="relative scroll-mt-20 border-t border-[#25213b] py-10 sm:py-12 lg:py-14"
    >
      <div className="mx-auto mb-8 sm:mb-10 max-w-3xl text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Licenses &amp; <span className="text-[#16f2b3]">Certifications</span>
        </h2>
        <p className="mt-2 text-sm leading-7 text-gray-400 md:text-base">
          Certifications and verified credentials across AI, software development and emerging tech.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2">
        {certifications.map((certification) => (
          <article
            key={certification.id}
            className="flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-[#111a36] to-[#0b1026] p-5 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-[#16f2b3]/40 md:p-6"
          >
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#16f2b3]/25 bg-[#16f2b3]/10 text-[#16f2b3]">
                <FaAward size={23} />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#16f2b3]">
                  {certification.category}
                </p>
                <h3 className="mt-2 text-base font-semibold leading-snug text-white md:text-lg">
                  {certification.name}
                </h3>
                {certification.issuer ? (
                  <p className="mt-1 text-sm text-gray-300">
                    Issued by {certification.issuer}
                  </p>
                ) : null}
                <p className="mt-2 text-xs leading-6 text-gray-400 md:text-sm">
                  {certification.description}
                </p>
              </div>
            </div>

            {certification.link ? (
              <div className="mt-4 flex justify-start border-t border-white/5 pt-3">
                <Link
                  href={certification.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#16f2b3]/30 bg-[#16f2b3]/10 px-3.5 py-1.5 text-xs font-semibold text-[#16f2b3] transition-all duration-200 hover:border-[#16f2b3]/60 hover:bg-[#16f2b3]/20 hover:text-white"
                >
                  View Credential
                  <HiExternalLink size={14} />
                </Link>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

export default Certifications;
