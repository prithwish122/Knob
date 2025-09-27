"use client"

import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import type { CSSProperties, ReactElement, ReactNode } from "react"

interface MagicCardProps {
  children: ReactNode
  className?: string
  gradientSize?: number
  gradientColor?: string
  gradientOpacity?: number
}

export function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientColor,
  gradientOpacity = 0.8,
}: MagicCardProps): ReactElement {
  const { theme } = useTheme()

  const defaultGradientColor = theme === "dark" ? "#10b981" : "#10b98155"
  const finalGradientColor = gradientColor || defaultGradientColor

  return (
    <div
      className={cn(
        "group relative flex size-full overflow-hidden rounded-xl border border-green-500/20 bg-card text-card-foreground shadow-2xl",
        className,
      )}
      style={
        {
          "--gradient-size": `${gradientSize}px`,
          "--gradient-color": finalGradientColor,
          "--gradient-opacity": gradientOpacity,
        } as CSSProperties
      }
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-green-500/20 to-green-600/10" />
        <div
          className="absolute size-[var(--gradient-size)] rounded-full bg-gradient-radial from-[var(--gradient-color)] to-transparent opacity-[var(--gradient-opacity)] blur-[2px] transition-all duration-300"
          style={{
            left: "var(--mouse-x, 50%)",
            top: "var(--mouse-y, 50%)",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
      <div className="relative z-10 size-full">{children}</div>
    </div>
  )
}
