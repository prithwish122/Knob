"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface LidoStakingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LidoStakingModal({ isOpen, onClose }: LidoStakingModalProps) {
  const [isLoading, setIsLoading] = useState(true)

  const handleClose = () => {
    toast({
      title: "Transaction Cancelled",
      description: "Staking transaction was cancelled by user",
      variant: "destructive",
    })
    onClose()
  }

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Listen for success messages from Lido interface
      if (event.origin === "https://stake.lido.fi" && event.data?.type === "transaction_success") {
        toast({
          title: "Transaction Successful",
          description: "Your ETH has been successfully staked with Lido",
          variant: "default",
        })
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener("message", handleMessage)
    }

    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [isOpen, onClose])

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl w-full h-[90vh] p-0 bg-gradient-to-br from-green-950/95 to-black/95 border border-green-400/30 flex flex-col">
        <DialogHeader className="p-4 pb-2 flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-green-300 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/20 border border-green-400/30">
                <img src="/icons/lido.png" alt="Lido" className="w-6 h-6" />
              </div>
              Stake ETH with Lido
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-gray-400 hover:text-white hover:bg-red-500/20 border border-gray-600/30 hover:border-red-400/50 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 px-4 pb-4">
          <div className="relative w-full h-full rounded-lg overflow-hidden border border-green-400/20">
            {isLoading && (
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-green-800/10 flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="animate-spin w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-green-300">Loading Lido Staking Interface...</p>
                </div>
              </div>
            )}
            <iframe
              src="https://stake.lido.fi/"
              className="w-full h-full"
              onLoad={handleIframeLoad}
              title="Lido Staking Interface"
              allow="web3"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
