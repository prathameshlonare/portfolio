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
    <div className="bg-white border-3 border-[#1A1A2E] shadow-[6px_6px_0px_#1A1A2E] md:shadow-[8px_8px_0px_#1A1A2E] p-4 md:p-6 lg:p-8 my-6 md:my-8 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b-2 border-[#1A1A2E] pb-3 md:pb-4 mb-5 md:mb-8 gap-2">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 md:w-5 md:h-5 text-[#FF6B35]" />
          <MonoLabel className="text-[#FF6B35] font-bold text-[10px] md:text-xs">AWS SERVERLESS ARCHITECTURE</MonoLabel>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[9px] md:text-[10px] font-bold text-emerald-600 bg-emerald-100 border border-emerald-300 px-2 py-0.5 self-start">
          <Radio className="w-3 h-3 md:w-3.5 md:h-3.5 animate-pulse" /> SYSTEM TOPOLOGY
        </div>
      </div>

      {/* Desktop: horizontal row */}
      <div className="hidden md:block">
        <div
          ref={containerRef}
          className="relative flex w-full items-center justify-between min-h-[280px] lg:min-h-[320px] px-4 py-8 bg-[#FAFAFA] border-2 border-[#1A1A2E] grid-exposed"
        >
          {/* Node 1: User Client */}
          <div className="flex flex-col items-center gap-2 z-20">
            <div
              ref={userRef}
              className="w-16 h-16 bg-white border-3 border-[#1A1A2E] shadow-[4px_4px_0px_#1A1A2E] flex items-center justify-center text-[#1A1A2E]"
            >
              <User className="w-8 h-8 text-[#FF6B35]" />
            </div>
            <span className="font-mono text-[11px] font-extrabold text-[#1A1A2E]">Client User</span>
          </div>

          {/* Node 2: CloudFront Edge */}
          <div className="flex flex-col items-center gap-2 z-20">
            <div
              ref={cdnRef}
              className="w-16 h-16 bg-white border-3 border-[#1A1A2E] shadow-[4px_4px_0px_#7C3AED] flex items-center justify-center text-[#1A1A2E]"
            >
              <Shield className="w-8 h-8 text-[#7C3AED]" />
            </div>
            <span className="font-mono text-[11px] font-extrabold text-[#1A1A2E]">CloudFront</span>
          </div>

          {/* Node 3: API Gateway */}
          <div className="flex flex-col items-center gap-2 z-20">
            <div
              ref={apiGatewayRef}
              className="w-16 h-16 bg-white border-3 border-[#1A1A2E] shadow-[4px_4px_0px_#FF6B35] flex items-center justify-center text-[#1A1A2E]"
            >
              <Server className="w-8 h-8 text-[#FF6B35]" />
            </div>
            <span className="font-mono text-[11px] font-extrabold text-[#1A1A2E]">API Gateway</span>
          </div>

          {/* Node 4: AWS Lambda */}
          <div className="flex flex-col items-center gap-2 z-20">
            <div
              ref={lambdaRef}
              className="w-16 h-16 bg-[#FF6B35] text-white border-3 border-[#1A1A2E] shadow-[4px_4px_0px_#1A1A2E] flex items-center justify-center"
            >
              <Cpu className="w-8 h-8" />
            </div>
            <span className="font-mono text-[11px] font-extrabold text-[#1A1A2E]">Lambda (6x)</span>
          </div>

          {/* Node 5 Stack: DynamoDB & S3 */}
          <div className="flex flex-col gap-4 z-20">
            <div className="flex flex-col items-center gap-1">
              <div
                ref={dbRef}
                className="w-14 h-14 bg-white border-3 border-[#1A1A2E] shadow-[4px_4px_0px_#7C3AED] flex items-center justify-center"
              >
                <Database className="w-7 h-7 text-[#7C3AED]" />
              </div>
              <span className="font-mono text-[10px] font-extrabold text-[#1A1A2E]">DynamoDB</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div
                ref={s3Ref}
                className="w-14 h-14 bg-white border-3 border-[#1A1A2E] shadow-[4px_4px_0px_#FF6B35] flex items-center justify-center"
              >
                <HardDrive className="w-7 h-7 text-[#FF6B35]" />
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
      </div>

      {/* Mobile: vertical flow with arrow connectors */}
      <div className="md:hidden">
        <div className="flex flex-col items-center gap-0 bg-[#FAFAFA] border-2 border-[#1A1A2E] py-6 px-4">
          {/* Node 1: User Client */}
          <div className="flex flex-col items-center gap-1.5 z-20">
            <div className="w-12 h-12 bg-white border-3 border-[#1A1A2E] shadow-[3px_3px_0px_#1A1A2E] flex items-center justify-center">
              <User className="w-6 h-6 text-[#FF6B35]" />
            </div>
            <span className="font-mono text-[9px] font-extrabold text-[#1A1A2E]">Client User</span>
          </div>

          {/* Arrow down */}
          <div className="flex flex-col items-center my-1">
            <div className="w-0.5 h-4 bg-[#1A1A2E]"></div>
            <div className="w-2 h-2 border-b-2 border-r-2 border-[#1A1A2E] transform rotate-45 -mt-1"></div>
          </div>

          {/* Node 2: CloudFront Edge */}
          <div className="flex flex-col items-center gap-1.5 z-20">
            <div className="w-12 h-12 bg-white border-3 border-[#1A1A2E] shadow-[3px_3px_0px_#7C3AED] flex items-center justify-center">
              <Shield className="w-6 h-6 text-[#7C3AED]" />
            </div>
            <span className="font-mono text-[9px] font-extrabold text-[#1A1A2E]">CloudFront</span>
          </div>

          {/* Arrow down */}
          <div className="flex flex-col items-center my-1">
            <div className="w-0.5 h-4 bg-[#1A1A2E]"></div>
            <div className="w-2 h-2 border-b-2 border-r-2 border-[#1A1A2E] transform rotate-45 -mt-1"></div>
          </div>

          {/* Node 3: API Gateway */}
          <div className="flex flex-col items-center gap-1.5 z-20">
            <div className="w-12 h-12 bg-white border-3 border-[#1A1A2E] shadow-[3px_3px_0px_#FF6B35] flex items-center justify-center">
              <Server className="w-6 h-6 text-[#FF6B35]" />
            </div>
            <span className="font-mono text-[9px] font-extrabold text-[#1A1A2E]">API Gateway</span>
          </div>

          {/* Arrow down */}
          <div className="flex flex-col items-center my-1">
            <div className="w-0.5 h-4 bg-[#1A1A2E]"></div>
            <div className="w-2 h-2 border-b-2 border-r-2 border-[#1A1A2E] transform rotate-45 -mt-1"></div>
          </div>

          {/* Node 4: AWS Lambda */}
          <div className="flex flex-col items-center gap-1.5 z-20">
            <div className="w-12 h-12 bg-[#FF6B35] text-white border-3 border-[#1A1A2E] shadow-[3px_3px_0px_#1A1A2E] flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <span className="font-mono text-[9px] font-extrabold text-[#1A1A2E]">Lambda (6x)</span>
          </div>

          {/* Arrow down + split */}
          <div className="flex flex-col items-center my-1">
            <div className="w-0.5 h-4 bg-[#1A1A2E]"></div>
            <div className="w-2 h-2 border-b-2 border-r-2 border-[#1A1A2E] transform rotate-45 -mt-1"></div>
          </div>

          {/* Node 5: DynamoDB & S3 side by side */}
          <div className="flex flex-row gap-6 z-20">
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 bg-white border-3 border-[#1A1A2E] shadow-[2px_2px_0px_#7C3AED] flex items-center justify-center">
                <Database className="w-5 h-5 text-[#7C3AED]" />
              </div>
              <span className="font-mono text-[8px] font-extrabold text-[#1A1A2E]">DynamoDB</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 bg-white border-3 border-[#1A1A2E] shadow-[2px_2px_0px_#FF6B35] flex items-center justify-center">
                <HardDrive className="w-5 h-5 text-[#FF6B35]" />
              </div>
              <span className="font-mono text-[8px] font-extrabold text-[#1A1A2E]">S3 Bucket</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mt-3 md:mt-4 gap-1 sm:gap-0 font-mono text-[10px] md:text-xs text-zinc-600">
        <span>[STATUS: 180ms P99 Latency]</span>
        <span className="font-bold text-[#FF6B35]">TERRAFORM CONTROLLED (IaC)</span>
      </div>
    </div>
  );
}
