"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface UniswapModalProps {
  isOpen: boolean
  onClose: () => void
}

export function UniswapModal({ isOpen, onClose }: UniswapModalProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      // Listen for iframe load
      const timer = setTimeout(() => setIsLoading(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleClose = () => {
    onClose()
    toast({
      title: "Transaction cancelled",
      description: "Uniswap liquidity operation was cancelled",
      variant: "destructive",
    })
  }

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  // Listen for successful transactions (simplified - in real app would need postMessage communication)
  useEffect(() => {
    if (isOpen) {
      const handleMessage = (event: MessageEvent) => {
        if (event.origin === "https://app.uniswap.org" && event.data?.type === "TRANSACTION_SUCCESS") {
          toast({
            title: "Transaction successful",
            description: "Your Uniswap liquidity operation was completed successfully",
          })
          onClose()
        }
      }

      window.addEventListener("message", handleMessage)
      return () => window.removeEventListener("message", handleMessage)
    }
  }, [isOpen, onClose, toast])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative w-full h-full max-w-7xl max-h-[95vh] mx-4 flex flex-col bg-gradient-to-br from-pink-900/20 via-purple-800/15 to-pink-900/10 border border-pink-400/20 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-6 bg-gradient-to-r from-pink-500/10 to-purple-600/10 border-b border-pink-400/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-pink-500/20 border border-pink-400/30">
              <Image src="/icons/uniswap.png" alt="Uniswap" width={24} height={24} className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-pink-300">Add Liquidity on Uniswap</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-pink-300 hover:text-white hover:bg-pink-500/20 rounded-lg p-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Iframe Container */}
        <div className="flex-1 relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-900/20 to-purple-800/10">
              <div className="text-center">
                <div className="animate-spin w-8 h-8 border-2 border-pink-400 border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-pink-300">Loading Uniswap interface...</p>
              </div>
            </div>
          )}
          <iframe
            src="https://app.uniswap.org/positions"
            className="w-full h-full border-0"
            onLoad={handleIframeLoad}
            title="Uniswap Positions"
          />
        </div>
      </div>
    </div>
  )
}
