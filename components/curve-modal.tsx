"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface CurveModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CurveModal({ isOpen, onClose }: CurveModalProps) {
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
      description: "Curve liquidity operation was cancelled",
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

      <div className="relative w-full max-w-6xl h-[90vh] mx-4 bg-gradient-to-br from-blue-900/20 to-blue-800/10 rounded-2xl border border-blue-400/20 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-blue-400/20 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-400/30">
              <Image src="/icons/curve.png" alt="Curve" width={24} height={24} className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-blue-300">Add Liquidity to Curve</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Iframe Container */}
        <div className="flex-1 relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900/20 to-blue-800/10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                <p className="text-blue-300">Loading Curve interface...</p>
              </div>
            </div>
          )}
          <iframe
            src="https://www.curve.finance/dex/ethereum/pools/factory-stable-ng-365/deposit"
            className="w-full h-full border-0 rounded-b-2xl"
            onLoad={handleIframeLoad}
            title="Curve Liquidity Interface"
          />
        </div>
      </div>
    </div>
  )
}
