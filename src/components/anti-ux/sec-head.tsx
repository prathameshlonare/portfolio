import { MonoLabel } from "@/components/anti-ux/mono-label";

interface SecHeadProps {
  index: string;
  label: string;
}

export function SecHead({ index, label }: SecHeadProps) {
  return (
    <div className="flex items-center gap-3 mb-4 md:mb-5">
      <span className="font-mono text-[11px] font-bold text-white bg-[#1A1A2E] px-2 py-0.5 shrink-0">
        {index}
      </span>
      <MonoLabel className="text-[11px] font-bold tracking-[0.1em] text-[#1A1A2E] shrink-0">
        {label}
      </MonoLabel>
      <div className="flex-1 border-t-2 border-[#1A1A2E]" aria-hidden="true" />
    </div>
  );
}
