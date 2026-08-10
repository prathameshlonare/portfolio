import { MonoLabel } from "@/components/anti-ux/mono-label";
import { NeoButton } from "@/components/anti-ux/neo-button";
import { Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const EMAIL = "prathameshlonare9@gmail.com";
const MAILTO_SUBJECT = "DevOps Opportunity / Cloud Infrastructure Inquiry";
const MAILTO_BODY = `Hi Prathamesh,\n\nI came across your portfolio and would like to discuss:\n\n[Your message here]\n\nBest regards,\n[Your name]`;

export function ContactPreview() {
  const mailtoHref = `mailto:${EMAIL}?subject=${encodeURIComponent(MAILTO_SUBJECT)}&body=${encodeURIComponent(MAILTO_BODY)}`;

  return (
    <section id="contact" className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
      <div className="bg-white border-3 border-[#1A1A2E] shadow-[6px_6px_0px_#FF6B35] md:shadow-[8px_8px_0px_#FF6B35] p-4 md:p-6 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Left Info */}
        <div className="lg:col-span-6 flex flex-col gap-4 md:gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-black text-[#1A1A2E] tracking-tight">
              LET&apos;S BUILD SOMETHING.
            </h2>
          </div>

          <p className="text-sm md:text-base text-zinc-700 font-medium leading-relaxed">
            Interested in cloud infrastructure, CI/CD pipeline optimization, or full-stack DevOps architecture? Send a message or email me directly.
          </p>

          <div className="flex flex-col gap-2.5 md:gap-3 font-mono text-xs md:text-sm">
            <a
              href={mailtoHref}
              className="neo-card p-3 md:p-4 border-2 border-[#1A1A2E] shadow-[3px_3px_0px_#1A1A2E] md:shadow-[4px_4px_0px_#1A1A2E] flex items-center justify-between hover:bg-[#FAFAFA] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-2 md:gap-3 min-w-0">
                <Mail className="w-4 h-4 md:w-5 md:h-5 text-[#FF6B35] shrink-0" />
                <span className="font-bold text-[#1A1A2E] truncate">{EMAIL}</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#FF6B35] shrink-0" />
            </a>

            <div className="grid grid-cols-2 gap-2 md:gap-3 mt-1 md:mt-2">
              <div className="border-2 border-[#1A1A2E] bg-[#FAFAFA] p-2.5 md:p-3 font-mono text-[10px] md:text-xs flex items-center gap-1.5 md:gap-2">
                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#FF6B35] shrink-0" />
                <span>Akot, India</span>
              </div>
              <div className="border-2 border-[#1A1A2E] bg-[#FAFAFA] p-2.5 md:p-3 font-mono text-[10px] md:text-xs flex items-center gap-1.5 md:gap-2">
                <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#7C3AED] shrink-0" />
                <span>IST (UTC+5:30)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right CTA */}
        <div className="lg:col-span-6 flex flex-col gap-3 md:gap-4">
          <div className="border-2 border-[#1A1A2E] p-4 md:p-6 bg-[#FAFAFA] shadow-[3px_3px_0px_#1A1A2E] md:shadow-[4px_4px_0px_#1A1A2E] flex flex-col gap-3 md:gap-4">
            <p className="font-mono text-xs md:text-sm text-zinc-600 leading-relaxed">
              Click below to open your email client with a pre-filled subject and message template.
            </p>

            <a href={mailtoHref} className="block">
              <NeoButton variant="primary" className="w-full py-3 font-mono text-sm justify-center">
                <Mail className="w-4 h-4" /> Open Email Client <ArrowUpRight className="w-4 h-4" />
              </NeoButton>
            </a>

            <Link href="/contact" className="block">
              <NeoButton variant="secondary" className="w-full py-3 font-mono text-sm justify-center">
                View Full Contact Page
              </NeoButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
