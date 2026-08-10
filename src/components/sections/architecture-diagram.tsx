"use client";

import React, { useRef } from "react";
import { AnimatedBeam } from "@/components/animated/animated-beam";
import { MonoLabel } from "@/components/anti-ux/mono-label";
import { User, Shield, Server, Cpu, Database, HardDrive, Radio } from "lucide-react";

export function ArchitectureDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const cdnRef = useRef<HTMLDivElement>(null);
  const apiGatewayRef = useRef<HTMLDivElement>(null);
  const lambdaRef = useRef<HTMLDivElement>(null);
  const dbRef = useRef<HTMLDivElement>(null);
  const s3Ref = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-white border-3 border-[#1A1A2E] shadow-[8px_8px_0px_#1A1A2E] p-6 md:p-8 my-8 relative overflow-hidden">
      <div className="flex justify-between items-center border-b-2 border-[#1A1A2E] pb-4 mb-8">
        <div className="flex items-center gap-2">
          <Server className="w-5 h-5 text-[#FF6B35]" />
          <MonoLabel className="text-[#FF6B35] font-bold">AWS SERVERLESS ARCHITECTURE (ANIMATED BEAMS)</MonoLabel>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-emerald-600 bg-emerald-100 border border-emerald-300 px-2 py-0.5">
          <Radio className="w-3.5 h-3.5 animate-pulse" /> LIVE STREAM
        </div>
      </div>

      {/* Nodes Container */}
      <div
        ref={containerRef}
        className="relative flex w-full items-center justify-between min-h-[280px] md:min-h-[320px] px-4 py-8 bg-[#FAFAFA] border-2 border-[#1A1A2E] grid-exposed"
      >
        {/* Node 1: User Client */}
        <div className="flex flex-col items-center gap-2 z-20">
          <div
            ref={userRef}
            className="w-12 h-12 md:w-16 md:h-16 bg-white border-3 border-[#1A1A2E] shadow-[4px_4px_0px_#1A1A2E] flex items-center justify-center text-[#1A1A2E]"
          >
            <User className="w-6 h-6 md:w-8 md:h-8 text-[#FF6B35]" />
          </div>
          <span className="font-mono text-[11px] font-extrabold text-[#1A1A2E]">Client User</span>
        </div>

        {/* Node 2: CloudFront Edge */}
        <div className="flex flex-col items-center gap-2 z-20">
          <div
            ref={cdnRef}
            className="w-12 h-12 md:w-16 md:h-16 bg-white border-3 border-[#1A1A2E] shadow-[4px_4px_0px_#7C3AED] flex items-center justify-center text-[#1A1A2E]"
          >
            <Shield className="w-6 h-6 md:w-8 md:h-8 text-[#7C3AED]" />
          </div>
          <span className="font-mono text-[11px] font-extrabold text-[#1A1A2E]">CloudFront</span>
        </div>

        {/* Node 3: API Gateway */}
        <div className="flex flex-col items-center gap-2 z-20">
          <div
            ref={apiGatewayRef}
            className="w-12 h-12 md:w-16 md:h-16 bg-white border-3 border-[#1A1A2E] shadow-[4px_4px_0px_#FF6B35] flex items-center justify-center text-[#1A1A2E]"
          >
            <Server className="w-6 h-6 md:w-8 md:h-8 text-[#FF6B35]" />
          </div>
          <span className="font-mono text-[11px] font-extrabold text-[#1A1A2E]">API Gateway</span>
        </div>

        {/* Node 4: AWS Lambda */}
        <div className="flex flex-col items-center gap-2 z-20">
          <div
            ref={lambdaRef}
            className="w-12 h-12 md:w-16 md:h-16 bg-[#FF6B35] text-white border-3 border-[#1A1A2E] shadow-[4px_4px_0px_#1A1A2E] flex items-center justify-center"
          >
            <Cpu className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <span className="font-mono text-[11px] font-extrabold text-[#1A1A2E]">Lambda (6x)</span>
        </div>

        {/* Node 5 Stack: DynamoDB & S3 */}
        <div className="flex flex-col gap-4 z-20">
          <div className="flex flex-col items-center gap-1">
            <div
              ref={dbRef}
              className="w-10 h-10 md:w-14 md:h-14 bg-white border-3 border-[#1A1A2E] shadow-[4px_4px_0px_#7C3AED] flex items-center justify-center"
            >
              <Database className="w-5 h-5 md:w-7 md:h-7 text-[#7C3AED]" />
            </div>
            <span className="font-mono text-[10px] font-extrabold text-[#1A1A2E]">DynamoDB</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div
              ref={s3Ref}
              className="w-10 h-10 md:w-14 md:h-14 bg-white border-3 border-[#1A1A2E] shadow-[4px_4px_0px_#FF6B35] flex items-center justify-center"
            >
              <HardDrive className="w-5 h-5 md:w-7 md:h-7 text-[#FF6B35]" />
            </div>
            <span className="font-mono text-[10px] font-extrabold text-[#1A1A2E]">S3 Bucket</span>
          </div>
        </div>

        {/* Animated Connection Beams */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={userRef}
          toRef={cdnRef}
          duration={3}
          gradientStartColor="#FF6B35"
          gradientStopColor="#FF6B35"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={cdnRef}
          toRef={apiGatewayRef}
          duration={3.5}
          gradientStartColor="#7C3AED"
          gradientStopColor="#FF6B35"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={apiGatewayRef}
          toRef={lambdaRef}
          duration={2.5}
          gradientStartColor="#FF6B35"
          gradientStopColor="#7C3AED"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={lambdaRef}
          toRef={dbRef}
          curvature={-30}
          duration={3}
          gradientStartColor="#FF6B35"
          gradientStopColor="#7C3AED"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={lambdaRef}
          toRef={s3Ref}
          curvature={30}
          duration={3.2}
          gradientStartColor="#FF6B35"
          gradientStopColor="#FF6B35"
        />
      </div>

      {/* Footer Info */}
      <div className="flex justify-between items-center mt-4 font-mono text-xs text-zinc-600">
        <span>[STATUS: 180ms P99 Latency]</span>
        <span className="font-bold text-[#FF6B35]">TERRAFORM CONTROLLED (IaC)</span>
      </div>
    </div>
  );
}
