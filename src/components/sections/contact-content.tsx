"use client";

import React, { useState } from "react";
import { MonoLabel } from "@/components/anti-ux/mono-label";
import { MovingBorderCard } from "@/components/animated/moving-border";
import { Mail, Send, MapPin, Clock, Copy, Check, ExternalLink } from "lucide-react";

const EMAIL = "prathameshlonare9@gmail.com";
const MAILTO_SUBJECT = "DevOps Opportunity / Cloud Infrastructure Inquiry";
const MAILTO_BODY = `Hi Prathamesh,

I came across your portfolio and would like to discuss:

[Your message here]

Best regards,
[Your name]`;

export function ContactContent() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const mailtoLink = `mailto:${EMAIL}?subject=${encodeURIComponent(MAILTO_SUBJECT)}&body=${encodeURIComponent(MAILTO_BODY)}`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(`Subject: ${MAILTO_SUBJECT}\n\n${MAILTO_BODY}`);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start my-6 md:my-8">
      {/* Left Column: Direct Info */}
      <div className="lg:col-span-5 flex flex-col gap-4 md:gap-6">
        <div className="border-3 border-[#1A1A2E] bg-white shadow-[4px_4px_0px_#1A1A2E] md:shadow-[6px_6px_0px_#1A1A2E] p-4 md:p-6">
          <MonoLabel className="text-[#FF6B35] mb-2 block">DIRECT EMAIL</MonoLabel>
          <div className="flex items-center justify-between border-2 border-[#1A1A2E] bg-[#FAFAFA] p-3 md:p-4">
            <div className="flex items-center gap-2 md:gap-3 min-w-0">
              <Mail className="w-4 h-4 md:w-5 md:h-5 text-[#FF6B35] shrink-0" />
              <span className="font-mono text-[11px] md:text-sm font-extrabold text-[#1A1A2E] truncate">
                {EMAIL}
              </span>
            </div>
            <button
              onClick={handleCopyEmail}
              className="neo-btn py-2 px-3 text-xs font-mono min-h-[44px] flex items-center"
              aria-label="Copy email address"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <div className="border-3 border-[#1A1A2E] bg-white shadow-[4px_4px_0px_#7C3AED] md:shadow-[6px_6px_0px_#7C3AED] p-4 md:p-6 flex flex-col gap-3 md:gap-4">
          <MonoLabel className="text-[#7C3AED] block">AVAILABILITY & LOCATION</MonoLabel>

          <div className="flex items-center gap-3 border-b border-zinc-200 pb-3 font-mono text-xs">
            <MapPin className="w-4 h-4 text-[#FF6B35]" />
            <div>
              <div className="font-bold text-[#1A1A2E]">Akot, Maharashtra, India</div>
              <div className="text-zinc-500 text-[10px]">Open to Remote & Hybrid Roles</div>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b border-zinc-200 pb-3 font-mono text-xs">
            <Clock className="w-4 h-4 text-[#7C3AED]" />
            <div>
              <div className="font-bold text-[#1A1A2E]">Indian Standard Time (UTC+5:30)</div>
              <div className="text-zinc-500 text-[10px]">Typical response under 24 hours</div>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-300 p-3 font-mono text-xs font-bold text-emerald-800 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Status: Available for DevOps / Cloud Engineering Opportunities
          </div>
        </div>
      </div>

      {/* Right Column: Mailto Action + Copy Fallback */}
      <div className="lg:col-span-7">
        <MovingBorderCard duration={4000}>
          <div className="flex flex-col gap-5">
            <div className="border-b-2 border-[#1A1A2E] pb-3 mb-1 flex justify-between items-center">
              <MonoLabel className="text-[#1A1A2E]">SEND A DISPATCH</MonoLabel>
              <span className="font-mono text-[10px] text-zinc-500 font-bold">[ZERO_BACKEND]</span>
            </div>

            <p className="font-mono text-sm text-zinc-600 leading-relaxed">
              Click below to open your primary desktop or mobile email client with a pre-formatted technical dispatch. Alternatively, copy the message template below to paste into LinkedIn, GitHub, or any messaging platform.
            </p>

            <div className="bg-amber-50 border border-amber-300 p-3.5 font-mono text-xs text-amber-900 leading-relaxed">
              <div className="font-bold mb-1 flex items-center gap-1.5 text-[#FF6B35]">
                <span>💡</span> WHAT TO INCLUDE IN YOUR INQUIRY:
              </div>
              <ul className="list-disc list-inside space-y-1 text-zinc-700">
                <li>DevOps engineering or AWS cloud infrastructure role details</li>
                <li>Target cloud platform (AWS, Hybrid, Serverless, Containers)</li>
                <li>Project timelines, deployment goals, or architecture requirements</li>
              </ul>
            </div>

            <a
              href={mailtoLink}
              className="neo-btn neo-btn--primary w-full py-4 font-mono text-sm justify-center flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> OPEN EMAIL CLIENT <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>

            <button
              onClick={handleCopyMessage}
              className="neo-btn neo-btn--secondary w-full py-3 font-mono text-sm justify-center flex items-center gap-2"
            >
              {copiedMessage ? (
                <>
                  <Check className="w-4 h-4" /> MESSAGE TEMPLATE COPIED
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> COPY MESSAGE TEMPLATE
                </>
              )}
            </button>

            <div className="border border-zinc-200 bg-[#FAFAFA] p-4 font-mono text-xs text-zinc-500 leading-relaxed">
              <div className="font-bold text-[#1A1A2E] mb-1">Pre-filled subject:</div>
              <div className="text-zinc-700">{MAILTO_SUBJECT}</div>
            </div>
          </div>
        </MovingBorderCard>
      </div>
    </div>
  );
}
