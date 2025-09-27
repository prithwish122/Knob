"use client"

import { motion } from "framer-motion"

export default function InteractiveDevice() {
  return (
    <motion.div
      className="relative flex h-full items-center justify-center"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div
        className="relative"
        whileHover={{ rotate: -2, y: -6 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Glow */}
        <div
          aria-hidden
          className="absolute -inset-10 -z-10 rounded-[36px] blur-2xl"
          style={{
            background:
              "radial-gradient(40% 40% at 50% 50%, rgba(0,255,136,0.25) 0%, rgba(22,163,74,0.15) 40%, rgba(0,0,0,0) 70%)",
          }}
        />
        {/* Frame */}
        <div
          className="rounded-[36px] p-2"
          style={{
            background: "linear-gradient(160deg, rgba(0,255,136,0.35), rgba(22,163,74,0.15), rgba(255,255,255,0.06))",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.06)",
          }}
        >
          <img
            src="/images/smartphone-1.png"
            alt="3D smartphone showcasing a crypto pools interface"
            className="block h-[min(72vh,700px)] w-auto select-none"
            draggable={false}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
