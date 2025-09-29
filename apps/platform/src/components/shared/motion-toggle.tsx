"use client"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Zap, ZapOff, Check, Settings } from "lucide-react"
import { useMotion } from "./motion-provider"

export function MotionToggle() {
  const { shouldAnimate, setShouldAnimate, isSystemReduced } = useMotion()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
        >
          {shouldAnimate ? <Zap className="h-4 w-4" /> : <ZapOff className="h-4 w-4" />}
          <span className="sr-only">Toggle motion preferences</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5 text-sm font-semibold text-foreground">Motion Preferences</div>
        <DropdownMenuItem
          onClick={() => setShouldAnimate(true)}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span>Enable animations</span>
          </div>
          {shouldAnimate && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setShouldAnimate(false)}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <ZapOff className="h-4 w-4" />
            <span>Reduce motion</span>
          </div>
          {!shouldAnimate && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        <div className="px-2 py-1.5 text-xs text-muted-foreground border-t border-border/50 mt-1">
          <div className="flex items-center gap-1">
            <Settings className="h-3 w-3" />
            System: {isSystemReduced ? "Reduced motion" : "Normal motion"}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
