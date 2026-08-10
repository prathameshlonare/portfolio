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
    <section id="contact" className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16">
      <div className="bg-white border-3 border-[#1A1A2E] shadow-[8px_8px_0px_#FF6B35] p-6 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Info */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-[#1A1A2E] tracking-tight">
              LET&apos;S BUILD SOMETHING.
            </h2>
          </div>

          <p className="text-base text-zinc-700 font-medium leading-relaxed">
            Interested in cloud infrastructure, CI/CD pipeline optimization, or full-stack DevOps architecture? Send a message or email me directly.
          </p>

          <div className="flex flex-col gap-3 font-mono text-sm">
            <a
              href={mailtoHref}
              className="neo-card p-4 border-2 border-[#1A1A2E] shadow-[4px_4px_0px_#1A1A2E] flex items-center justify-between hover:bg-[#FAFAFA] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#FF6B35]" />
                <span className="font-bold text-[#1A1A2E]">{EMAIL}</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#FF6B35]" />
            </a>

            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="border-2 border-[#1A1A2E] bg-[#FAFAFA] p-3 font-mono text-xs flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FF6B35]" />
                <span>Akot, India</span>
              </div>
              <div className="border-2 border-[#1A1A2E] bg-[#FAFAFA] p-3 font-mono text-xs flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#7C3AED]" />
                <span>IST (UTC+5:30)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right CTA */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="border-2 border-[#1A1A2E] p-6 bg-[#FAFAFA] shadow-[4px_4px_0px_#1A1A2E] flex flex-col gap-4">
            <p className="font-mono text-sm text-zinc-600 leading-relaxed">
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
