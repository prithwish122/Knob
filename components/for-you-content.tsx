"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, Shield, Zap, Crown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
// import propabi from "../smart-contracts/abi.json"
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react"
import { useWriteContract } from "wagmi"
// import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react"
import propabi from "../smart-contracts/abi.json"

export function ForYouContent() {
  const [showPricingModal, setShowPricingModal] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false) // Flag variable for subscription status
  const { toast } = useToast()

  const { address ,isConnected } = useAppKitAccount() // AppKit hook to get the address and check if the user is connected
      const { chainId } = useAppKitNetwork() // to get chainid
      const { writeContract, isSuccess } = useWriteContract() // to in
  
      const contract_address = "0xB6e8DE6aBE31F36415297e38f87e49890a257A0A" // replace with your contract address
      const add = "0xEF611ba58607A40727259A2768e41654fB000a12"
      const token = 50;

  const handleSubscribe = () => {
    // User will handle the actual transaction logic

     writeContract({
      abi: propabi,
      functionName: "transfer",
      address: contract_address,
      args: [add , token],
    })

    
    if(isSuccess){
    setShowPricingModal(false)
    setIsSubscribed(true)
    toast({
      title: "Subscription Initiated",
      description: "Please complete the transaction to activate your subscription.",
    }) // Update subscription status
  }
}

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-primary mb-2">For You</h2>
          <p className="text-muted-foreground">Personalized DeFi recommendations powered by AI</p>
        </div>
        {!isSubscribed && (
          <Button
            onClick={() => setShowPricingModal(true)}
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
          >
            <Crown className="w-4 h-4 mr-2" />
            Upgrade to Pro
          </Button>
        )}
      </div>

      {isSubscribed ? (
        <div className="grid gap-6">
          <Card className="border-emerald-200 bg-emerald-50/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-emerald-800">AI Recommendations Active</CardTitle>
                <Badge className="bg-emerald-600">Pro Member</Badge>
              </div>
              <CardDescription>Your personalized DeFi strategy recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="font-medium">High Yield Opportunity</p>
                    <p className="text-sm text-muted-foreground">
                      Lido staking shows 4.2% APY - Consider increasing allocation
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Risk Diversification</p>
                    <p className="text-sm text-muted-foreground">
                      Consider spreading across 3-4 protocols to reduce risk
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Gas Optimization</p>
                    <p className="text-sm text-muted-foreground">Best time to transact: 2-4 AM UTC (Low gas fees)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="border-dashed border-2 border-muted-foreground/20">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Crown className="w-16 h-16 text-muted-foreground/40 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Unlock AI-Powered Recommendations</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Get personalized DeFi strategies, yield optimization tips, and risk management advice tailored to your
              portfolio.
            </p>
            <Button
              onClick={() => setShowPricingModal(true)}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
            >
              View Pricing
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Pricing Modal */}
      {showPricingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Subscription Pricing</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPricingModal(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ×
                </Button>
              </div>

              <Card className="border-emerald-200">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Crown className="w-8 h-8 text-emerald-600" />
                  </div>
                  <CardTitle className="text-2xl">Pro Recommendations</CardTitle>
                  <CardDescription>AI-powered personalized DeFi insights</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600">50 NOB</div>
                    <div className="text-sm text-muted-foreground">per month</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm">Personalized yield strategies</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm">Real-time market insights</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm">Risk assessment & alerts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm">Gas optimization tips</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleSubscribe}
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
                  >
                    Subscribe for 50 NOB
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
