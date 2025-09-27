"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { MagicCard } from "@/components/ui/magic-card"
import {
  BarChart3,
  TrendingUp,
  Zap,
  Shield,
  Coins,
  Activity,
  ArrowUpRight,
  DollarSign,
  Users,
  Clock,
} from "lucide-react"

const poolCategories = [
  { id: "liquidity", label: "Liquidity Pools" },
  { id: "staking", label: "Staking Pools" },
  { id: "yield", label: "Yield Farming" },
  { id: "insurance", label: "Insurance Pools" },
  { id: "collateral", label: "Collateral Pools" },
]

const liquidityPools = [
  { name: "ETH/USDC", tvl: "$2.4M", apy: "12.5%", volume: "$450K" },
  { name: "BTC/ETH", tvl: "$1.8M", apy: "8.2%", volume: "$320K" },
  { name: "USDC/USDT", tvl: "$3.2M", apy: "5.8%", volume: "$680K" },
  { name: "ETH/DAI", tvl: "$1.5M", apy: "9.7%", volume: "$280K" },
]

const stakingPools = [
  { name: "ETH 2.0 Staking", apy: "4.2%", tvl: "$12.5M", tokenPair: "ETH" },
  { name: "Polygon Validator", apy: "8.5%", tvl: "$3.2M", tokenPair: "MATIC" },
  { name: "Cardano Pool", apy: "5.1%", tvl: "$2.8M", tokenPair: "ADA" },
  { name: "Solana Validator", apy: "6.8%", tvl: "$4.1M", tokenPair: "SOL" },
  { name: "Avalanche Node", apy: "9.2%", tvl: "$1.9M", tokenPair: "AVAX" },
]

export function PoolsContent() {
  const [activeCategory, setActiveCategory] = useState("liquidity")
  const [isLoading, setIsLoading] = useState(false)

  const handleCategoryChange = (categoryId: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setActiveCategory(categoryId)
      setIsLoading(false)
    }, 200)
  }

  const renderPoolContent = () => {
    if (activeCategory === "liquidity") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {liquidityPools.map((pool, index) => (
            <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <MagicCard
                gradientColor="#10b981"
                className="group relative overflow-hidden bg-gradient-to-br from-green-900/20 via-green-800/15 to-green-900/10 border border-green-400/20 hover:border-green-400/40 transition-all duration-500 shadow-2xl shadow-green-500/5 hover:shadow-green-500/20 glow-green-subtle hover:glow-green backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-400/10 to-transparent rounded-full blur-2xl" />

                <Card className="relative border-none bg-transparent shadow-none">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-green-300 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-green-500/20 border border-green-400/30">
                          <BarChart3 className="w-5 h-5 text-green-400" />
                        </div>
                        {pool.name}
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <DollarSign className="w-4 h-4" />
                          TVL
                        </div>
                        <div className="text-2xl font-bold text-white">{pool.tvl}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <TrendingUp className="w-4 h-4" />
                          APY
                        </div>
                        <Badge className="text-lg font-bold bg-gradient-to-r from-green-500/30 to-green-600/20 text-green-300 border border-green-400/40 px-3 py-1">
                          {pool.apy}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/5 border border-green-400/20">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Activity className="w-4 h-4 text-green-400" />
                        24h Volume
                      </div>
                      <span className="font-semibold text-white">{pool.volume}</span>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 border border-green-400/20 hover:border-green-300/30 group">
                      <span className="flex items-center gap-2">
                        Add Liquidity
                        <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                      </span>
                    </Button>
                  </CardContent>
                </Card>
              </MagicCard>
            </div>
          ))}
        </div>
      )
    }

    if (activeCategory === "staking") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {stakingPools.map((pool, index) => (
            <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <MagicCard
                gradientColor="#10b981"
                className="group relative overflow-hidden bg-gradient-to-br from-green-900/20 via-green-800/15 to-green-900/10 border border-green-400/20 hover:border-green-400/40 transition-all duration-500 shadow-2xl shadow-green-500/5 hover:shadow-green-500/20 glow-green-subtle hover:glow-green backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-400/10 to-transparent rounded-full blur-2xl" />

                <Card className="relative border-none bg-transparent shadow-none">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-green-300 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-green-500/20 border border-green-400/30">
                          <TrendingUp className="w-5 h-5 text-green-400" />
                        </div>
                        {pool.name}
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/5 border border-green-400/20">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Coins className="w-4 h-4 text-green-400" />
                        Token
                      </div>
                      <Badge className="bg-green-900/50 text-green-300 border border-green-400/40 font-semibold">
                        {pool.tokenPair}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <TrendingUp className="w-4 h-4" />
                          APY
                        </div>
                        <Badge className="text-lg font-bold bg-gradient-to-r from-green-500/30 to-green-600/20 text-green-300 border border-green-400/40 px-3 py-1">
                          {pool.apy}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Users className="w-4 h-4" />
                          TVL
                        </div>
                        <div className="text-2xl font-bold text-white">{pool.tvl}</div>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 border border-green-400/20 hover:border-green-300/30 group">
                      <span className="flex items-center gap-2">
                        Stake Now
                        <Shield className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                      </span>
                    </Button>
                  </CardContent>
                </Card>
              </MagicCard>
            </div>
          ))}
        </div>
      )
    }

    return (
      <div className="text-center py-20">
        <div className="animate-pulse-glow p-8 rounded-2xl bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-400/20 max-w-md mx-auto">
          <Clock className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <p className="text-gray-300 text-lg font-medium">
            {activeCategory === "yield" && "Advanced yield farming strategies coming soon..."}
            {activeCategory === "insurance" && "Decentralized insurance protocols coming soon..."}
            {activeCategory === "collateral" && "Collateral management systems coming soon..."}
          </p>
          <p className="text-green-400/70 text-sm mt-2">Building the future of DeFi</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-950/5 to-black">
      <div className="relative p-8 pb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-green-600/5 rounded-2xl" />
        
      </div>

      <div className="px-8 pb-8">
        <div className="flex flex-wrap gap-3">
          {poolCategories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              className={cn(
                "relative overflow-hidden transition-all duration-300 rounded-xl border font-semibold px-6 py-3",
                activeCategory === category.id
                  ? "bg-gradient-to-r from-green-500/20 to-green-600/10 text-green-300 border-green-400/40 shadow-lg shadow-green-500/20 glow-green-subtle"
                  : "border-green-500/20 text-gray-300 hover:bg-green-500/10 hover:text-green-300 hover:border-green-400/30 hover:shadow-lg hover:shadow-green-500/10",
              )}
              onClick={() => handleCategoryChange(category.id)}
              disabled={isLoading}
            >
              {activeCategory === category.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-600/5 animate-pulse-glow" />
              )}
              <span className="relative">{category.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="px-8 pb-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-64 bg-green-500/5 rounded-xl border border-green-400/20" />
              </div>
            ))}
          </div>
        ) : (
          renderPoolContent()
        )}
      </div>
    </div>
  )
}
