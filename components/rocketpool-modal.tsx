"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface RocketPoolModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RocketPoolModal({ isOpen, onClose }: RocketPoolModalProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      const timer = setTimeout(() => setIsLoading(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleClose = () => {
    toast({
      title: "Transaction Cancelled",
      description: "Rocket Pool staking operation was cancelled",
      variant: "destructive",
    })
    onClose()
  }

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative w-full max-w-6xl h-[90vh] mx-4 bg-gradient-to-br from-red-900/20 to-red-800/10 rounded-2xl border border-red-400/20 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-red-400/20 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/20 border border-red-400/30">
              <div className="w-6 h-6 bg-gradient-to-br from-red-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">RP</span>
              </div>
            </div>
            <h2 className="text-xl font-bold text-red-300">Stake with Rocket Pool</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Iframe Container */}
        <div className="flex-1 relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-900/20 to-red-800/10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-400 mx-auto mb-4"></div>
                <p className="text-red-300">Loading Rocket Pool interface...</p>
              </div>
            </div>
          )}
          <iframe
            src="https://stake.rocketpool.net/"
            className="w-full h-full border-0 rounded-b-2xl"
            onLoad={handleIframeLoad}
            title="Rocket Pool Staking Interface"
          />
        </div>
      </div>
    </div>
  )
}
