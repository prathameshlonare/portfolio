"use client"

import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { ScrambleText } from "@/components/ScrambleText"

export function SkillBadge({ skill }: { skill: string }) {
  return (
    <Tooltip>
      <TooltipTrigger render={<Badge variant="terminal" />}>
        <ScrambleText text={skill} />
      </TooltipTrigger>
      <TooltipContent>
        <span>{skill}</span>
      </TooltipContent>
    </Tooltip>
  )
}
