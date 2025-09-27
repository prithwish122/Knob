import type React from "react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import InteractiveDevice from "@/components/interactive-device"
import { HoverExpand_001 } from "@/components/skiper52"

export default function Page() {
  // green-themed images for the Skiper gallery using placeholders
  const images = [
    { src: "/images/green/gradient-1.jpg", alt: "Emerald gradient 01", code: "# 01" },
    { src: "/images/green/gradient-2.jpg", alt: "Emerald gradient 02", code: "# 02" },
    { src: "/images/green/gradient-3.jpg", alt: "Emerald gradient 03", code: "# 03" },
    { src: "/images/green/gradient-4.jpg", alt: "Emerald gradient 04", code: "# 04" },
    { src: "/images/green/gradient-5.jpg", alt: "Emerald gradient 05", code: "# 05" },
    { src: "/images/green/gradient-6.jpg", alt: "Emerald gradient 06", code: "# 06" },
    { src: "/images/green/gradient-7.jpg", alt: "Emerald gradient 07", code: "# 07" },
    { src: "/images/green/gradient-8.jpg", alt: "Emerald gradient 08", code: "# 08" },
  ]

  // We set CSS variables inline to avoid editing globals.css, then use semantic tokens.
  return (
    <main
      className="min-h-screen bg-background text-foreground flex flex-col"
      style={
        {
          // theme tokens for this page
          "--background": "#000000",
          "--foreground": "rgba(231, 255, 240, 0.96)",
          "--muted": "#0b1410",
          "--brand-green": "#16a34a", // dark emerald
          "--brand-green-2": "#00ff88", // neon accent
          "--card": "rgba(8, 12, 10, 0.6)",
          "--border": "rgba(255,255,255,0.08)",
        } as React.CSSProperties
      }
    >
      <Navbar />

      <div className="flex-1 grid grid-cols-1 gap-8 px-[100px] pb-12 pt-6 lg:grid-cols-[1fr_420px]">
        {/* Left column: Skiper section + Hero */}
        <div className="flex flex-col gap-8">
          {/* Skiper section */}
          <section
            className="rounded-3xl border"
            style={{
              borderColor: "var(--border)",
              background: "var(--card)",
              boxShadow: "0 0 0 1px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.02)",
              backdropFilter: "blur(8px)",
            }}
          >
            <HoverExpand_001 images={images as any} className="px-0" />
          </section>

          {/* Hero content */}
          <section className="flex flex-col gap-8 ml-20">
            <h1 className="text-pretty text-5xl font-bold sm:text-6xl">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, var(--brand-green), var(--brand-green-2))",
                }}
              >
                Your Ethereum Investements, Simplified.
              </span>
            </h1>
            

            <div className="flex items-center gap-4">
              <Button
                className="px-12 py-6 text-xl font-semibold rounded-full"
                style={{
                  color: "#00160a",
                  backgroundImage: "linear-gradient(135deg, var(--brand-green), var(--brand-green-2))",
                }}
              >
                Docs
              </Button>
              <Button
                className="px-12 py-6 text-xl font-semibold rounded-full"
                style={{
                  color: "#00160a",
                  backgroundImage: "linear-gradient(135deg, var(--brand-green), var(--brand-green-2))",
                }}
              >
                Get started
              </Button>
            </div>
          </section>
        </div>

        {/* Right column: Interactive device */}
        <aside className="sticky top-6 h-[min(78vh,760px)]">
          <InteractiveDevice />
        </aside>
      </div>

      {/* Gradient edge accents for a professional touch */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-40"
        style={{
          background: "radial-gradient(60% 60% at 50% 0%, rgba(0,255,136,0.12) 0%, rgba(0,0,0,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 bottom-0 -z-10 h-40"
        style={{
          background: "radial-gradient(60% 60% at 50% 100%, rgba(22,163,74,0.12) 0%, rgba(0,0,0,0) 70%)",
        }}
      />
    </main>
  )
}