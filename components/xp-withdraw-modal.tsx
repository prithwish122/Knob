"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Coins, ArrowRight, Wallet } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface XPWithdrawModalProps {
  isOpen: boolean
  onClose: () => void
}

export function XPWithdrawModal({ isOpen, onClose }: XPWithdrawModalProps) {
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  const { toast } = useToast()

  const currentXP = 125
  const conversionRate = 20 // 20 XP = 1 NOB token
  const availableNOBTokens = Math.floor(currentXP / conversionRate)

  const handleWithdraw = async () => {
    setIsWithdrawing(true)

    // Simulate withdrawal process
    setTimeout(() => {
      setIsWithdrawing(false)
      onClose()
      toast({
        title: "Withdrawal Successful",
        description: `${availableNOBTokens} NOB tokens have been withdrawn to your wallet.`,
        duration: 5000,
      })
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <Card className="relative w-full max-w-md mx-4 bg-gradient-to-br from-green-900/90 via-green-800/80 to-green-900/90 border border-green-400/30 shadow-2xl shadow-green-500/20 backdrop-blur-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-green-300 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/20 border border-green-400/30">
                <Coins className="w-5 h-5 text-green-400" />
              </div>
              XP to NOB Tokens
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-green-500/20 rounded-full p-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Current XP Display */}
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-400/20">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Current XP</span>
              <Badge className="bg-green-500/30 text-green-300 border-green-400/40 text-lg px-3 py-1">
                {currentXP} XP
              </Badge>
            </div>
          </div>

          {/* Conversion Rate */}
          <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/5 to-green-600/5 border border-green-400/20">
            <div className="flex items-center justify-center gap-3 text-center">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-900/50 text-green-300 border-green-400/40">20 XP</Badge>
                <ArrowRight className="w-4 h-4 text-green-400" />
                <Badge className="bg-green-500/30 text-green-300 border-green-400/40">1 NOB</Badge>
              </div>
            </div>
            <p className="text-gray-400 text-sm text-center mt-2">Conversion Rate</p>
          </div>

          {/* Available NOB Tokens */}
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-400/20">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Available to Withdraw</span>
              <Badge className="bg-gradient-to-r from-green-500/30 to-green-600/20 text-green-300 border-green-400/40 text-lg px-3 py-1">
                {availableNOBTokens} NOB
              </Badge>
            </div>
            <p className="text-gray-400 text-xs mt-1">
              {currentXP % conversionRate} XP remaining (need {conversionRate - (currentXP % conversionRate)} more for
              next NOB)
            </p>
          </div>

          {/* Withdraw Button */}
          <Button
            onClick={handleWithdraw}
            disabled={availableNOBTokens === 0 || isWithdrawing}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 border border-green-400/20 hover:border-green-300/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              {isWithdrawing ? "Withdrawing..." : `Withdraw ${availableNOBTokens} NOB Tokens`}
            </span>
          </Button>

          {availableNOBTokens === 0 && (
            <p className="text-center text-gray-400 text-sm">You need at least 20 XP to withdraw NOB tokens</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
