"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Wallet, Shield, Zap, ArrowRight } from "lucide-react"

interface ConnectWalletModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ConnectWalletModal({ open, onOpenChange }: ConnectWalletModalProps) {
  

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-gray-900 via-green-950 to-black border border-green-800/40 shadow-xl p-0 gap-0 overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-green-950/20" />

          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors duration-200 border border-gray-600"
          >
            <X className="w-4 h-4 text-gray-400 hover:text-green-400 transition-colors" />
          </button>

          <div className="relative p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-800/30 to-green-900/20 border border-green-700/50">
                  <Wallet className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent mb-2">
                Connect Wallet
              </h1>
              
            </div>

            <div className="space-y-3 mb-6">
              {[
                { icon: Shield, text: "Secure connection" },
                { icon: Zap, text: "Instant access" },
              ].map((feature, index) => (
                null
              ))}
            </div>

                <div className="flex justify-center">
                <appkit-button />
                </div>

            
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
