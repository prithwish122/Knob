"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import "swiper/css"
import "swiper/css/effect-creative"
import "swiper/css/pagination"
import "swiper/css/autoplay"

import { cn } from "@/lib/utils"

const Skiper52 = () => {
  const cards = [
    {
      gradient: "bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700",
      alt: "Professional Green Gradient 1",
      code: "# 01",
      title: "Simplifying Web3 investing",
      description: "turning complexity into crystal-clear choices"
    },
    {
      gradient: "bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-800",
      alt: "Professional Green Gradient 2",
      code: "# 02",
      title: "Uniting Protocols",
      description: "uniting pools, swaps, and bridges across Ethereum"
    },
    {
      gradient: "bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900",
      alt: "Professional Green Gradient 3",
      code: "# 03",
      title: "Smart Scoring",
      description: "scoring opportunities with simple, trustworthy metrics"
    },
    {
      gradient: "bg-gradient-to-br from-green-500 via-emerald-600 to-green-800",
      alt: "Professional Green Gradient 4",
      code: "# 04",
      title: "Investor Profiles",
      description: "revealing your investor profile—cautious saver, yield hunter, or leverager"
    },
    {
      gradient: "bg-gradient-to-br from-emerald-400 via-green-600 to-emerald-800",
      alt: "Professional Green Gradient 5",
      code: "# 05",
      title: "Personalized Feed",
      description: "curating a \"For You\" feed that learns from your moves"
    },
    {
      gradient: "bg-gradient-to-br from-green-600 via-emerald-700 to-green-900",
      alt: "Professional Green Gradient 6",
      code: "# 06",
      title: "Smart Routing",
      description: "routing trades gas-smart and security-first"
    },
    {
      gradient: "bg-gradient-to-br from-emerald-300 via-emerald-600 to-green-900",
      alt: "Professional Green Gradient 7",
      code: "# 07",
      title: "Confident Investing",
      description: "so you invest with clarity, confidence, and calm"
    },
    {
      gradient: "bg-gradient-to-br from-emerald-500 via-green-700 to-slate-900",
      alt: "Professional Green Gradient 8",
      code: "# 08",
      title: "Web3 Made Simple",
      description: "transforming DeFi complexity into intuitive decisions"
    },
  ]

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-[#f5f4f3]">
      <HoverExpand_001 className="" cards={cards} />{" "}
    </div>
  )
}

export { Skiper52 }

const HoverExpand_001 = ({
  cards,
  className,
}: {
  cards?: { gradient: string; alt: string; code: string; title: string; description: string }[]
  className?: string
}) => {
  const [activeCard, setActiveCard] = useState<number | null>(1)

  // Default cards if none provided
  const defaultCards = [
    {
      gradient: "bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700",
      alt: "Professional Green Gradient 1",
      code: "# 01",
      title: "Simplifying Web3 investing",
      description: "turning complexity into crystal-clear choices"
    },
    {
      gradient: "bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-800",
      alt: "Professional Green Gradient 2",
      code: "# 02",
      title: "Uniting Protocols",
      description: "uniting pools, swaps, and bridges across Ethereum"
    },
    {
      gradient: "bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900",
      alt: "Professional Green Gradient 3",
      code: "# 03",
      title: "Smart Scoring",
      description: "scoring opportunities with simple, trustworthy metrics"
    },
    {
      gradient: "bg-gradient-to-br from-green-500 via-emerald-600 to-green-800",
      alt: "Professional Green Gradient 4",
      code: "# 04",
      title: "Investor Profiles",
      description: "revealing your investor profile—cautious saver, yield hunter, or leverager"
    },
    {
      gradient: "bg-gradient-to-br from-emerald-400 via-green-600 to-emerald-800",
      alt: "Professional Green Gradient 5",
      code: "# 05",
      title: "Personalized Feed",
      description: "curating a \"For You\" feed that learns from your moves"
    },
    {
      gradient: "bg-gradient-to-br from-green-600 via-emerald-700 to-green-900",
      alt: "Professional Green Gradient 6",
      code: "# 06",
      title: "Smart Routing",
      description: "routing trades gas-smart and security-first"
    },
    {
      gradient: "bg-gradient-to-br from-emerald-300 via-emerald-600 to-green-900",
      alt: "Professional Green Gradient 7",
      code: "# 07",
      title: "Confident Investing",
      description: "so you invest with clarity, confidence, and calm"
    },
    {
      gradient: "bg-gradient-to-br from-emerald-500 via-green-700 to-slate-900",
      alt: "Professional Green Gradient 8",
      code: "# 08",
      title: "Web3 Made Simple",
      description: "transforming DeFi complexity into intuitive decisions"
    },
  ]

  const cardsToRender = cards || defaultCards

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("relative w-full max-w-6xl px-5", className)}
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="w-full">
        <div className="flex w-full items-center justify-center gap-1">
          {cardsToRender.map((card, index) => (
            <motion.div
              key={index}
              className="relative cursor-pointer overflow-hidden rounded-3xl"
              initial={{ width: "2.5rem", height: "20rem" }}
              animate={{
                width: activeCard === index ? "24rem" : "5rem",
                height: activeCard === index ? "24rem" : "24rem",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={() => setActiveCard(index)}
              onHoverStart={() => setActiveCard(index)}
            >
              <AnimatePresence>
                {activeCard === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute h-full w-full bg-gradient-to-t from-black/50 via-transparent to-transparent"
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {activeCard === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute flex h-full w-full flex-col justify-end p-6"
                  >
                    <div className="space-y-3">
                      <p className="text-xs text-white/60 font-medium tracking-wider uppercase">{card.code}</p>
                      <h3 className="text-xl font-bold text-white leading-tight">{card.title}</h3>
                      <p className="text-sm text-white/80 leading-relaxed font-light">{card.description}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className={`size-full ${card.gradient}`} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export { HoverExpand_001 }

/**
 * Skiper 52 HoverExpand_001 — React + Framer Motion
 * Modified to use green color shades instead of images
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */