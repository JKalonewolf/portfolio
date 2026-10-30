import { certifications } from "@/utils/data/certifications";
import { FaAward } from "react-icons/fa";

function Certifications() {
  return (
    <section
      id="certifications"
      className="relative my-16 scroll-mt-24 border-t border-[#25213b] py-12 lg:my-24 lg:py-16"
    >
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#16f2b3]">
          Certifications
        </p>
        <h2 className="text-2xl font-bold text-white md:text-4xl">
          Continuous learning, <span className="text-[#16f2b3]">practical skills.</span>
        </h2>
        <p className="mt-4 text-sm leading-7 text-gray-400 md:text-base">
          Certifications and structured learning that support my work across product,
          AI, software development and emerging technologies.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2">
        {certifications.map((certification) => (
          <article
            key={certification.id}
            className="flex gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-[#111a36] to-[#0b1026] p-5 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-[#16f2b3]/40 md:p-6"
          >
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
          </article>
        ))}
      </div>
    </section>
  );
}

export default Certifications;
