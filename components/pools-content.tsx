"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { MagicCard } from "@/components/ui/magic-card"
import { BarChart3, TrendingUp, Zap, Shield, Coins, Activity, ArrowUpRight, DollarSign, Clock } from "lucide-react"
import Image from "next/image"
import { LidoStakingModal } from "./lido-staking-modal"
import { UniswapModal } from "./uniswap-modal"
import { AaveModal } from "./aave-modal"
import { MakerDAOModal } from "./makerdao-modal"
import { CurveModal } from "./curve-modal"
import { CompoundModal } from "./compound-modal"
import { RocketPoolModal } from "./rocketpool-modal"

const poolsData = [
  {
    protocol: "Lido",
    apr_apy: "2.66% APY",
    tvl: "$33.99B",
    "24h_volume": "$75.89M",
    type: "Staking Pools",
  },
  {
    protocol: "Uniswap",
    apr_apy: "Varies by pool",
    tvl: "$4.27B",
    "24h_volume": "$4.1B",
    type: "Liquidity Pools",
  },
  {
    protocol: "Aave",
    apr_apy: "3-6% (varies by asset)",
    tvl: "$68B",
    "24h_volume": "$299.53M",
    type: "Collateral Pools",
  },
  {
    protocol: "MakerDAO",
    apr_apy: "2-5% (loan rate)",
    tvl: "$5.94B",
    "24h_volume": "$100.93M",
    type: "Collateral Pools",
  },
  {
    protocol: "Curve",
    apr_apy: "6.5% APY",
    tvl: "$2.57B",
    "24h_volume": "$210.4M",
    type: "Liquidity Pools",
  },
  {
    protocol: "Compound",
    apr_apy: "0.92% APY",
    tvl: "$2.96B",
    "24h_volume": "$33.46M",
    type: "Collateral Pools",
  },
  {
    protocol: "Rocket Pool",
    apr_apy: "3.5-4% APY",
    tvl: "$2.51B",
    "24h_volume": "$16.99M",
    type: "Staking Pools",
  },
  {
    protocol: "Convex",
    apr_apy: "8%+ (varies)",
    tvl: "$181.7M",
    "24h_volume": "$12.47M",
    type: "Yield Farming",
  },
  {
    protocol: "Yearn",
    apr_apy: "Varies by vault",
    tvl: "$478M",
    "24h_volume": "$12.07M",
    type: "Yield Farming",
  },
  {
    protocol: "Chainlink",
    apr_apy: "n/a (oracle)",
    tvl: "$100B+ TVS",
    "24h_volume": "$2.63B",
    type: "Infrastructure / Oracle (not a pool)",
  },
]

const poolCategories = [
  { id: "all", label: "All Pools" },
  { id: "Liquidity Pools", label: "Liquidity Pools" },
  { id: "Staking Pools", label: "Staking Pools" },
  { id: "Yield Farming", label: "Yield Farming" },
  { id: "Collateral Pools", label: "Collateral Pools" },
]

export function PoolsContent() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [isLidoModalOpen, setIsLidoModalOpen] = useState(false)
  const [isUniswapModalOpen, setIsUniswapModalOpen] = useState(false)
  const [isAaveModalOpen, setIsAaveModalOpen] = useState(false)
  const [isMakerDAOModalOpen, setIsMakerDAOModalOpen] = useState(false)
  const [isCurveModalOpen, setIsCurveModalOpen] = useState(false)
  const [isCompoundModalOpen, setIsCompoundModalOpen] = useState(false)
  const [isRocketPoolModalOpen, setIsRocketPoolModalOpen] = useState(false)

  const handleCategoryChange = (categoryId: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setActiveCategory(categoryId)
      setIsLoading(false)
    }, 200)
  }

  const handleStakeAction = (protocol: string, type: string) => {
    if (protocol === "Lido" && type === "Staking Pools") {
      setIsLidoModalOpen(true)
    } else if (protocol === "Uniswap" && type === "Liquidity Pools") {
      setIsUniswapModalOpen(true)
    } else if (protocol === "Aave" && type === "Collateral Pools") {
      setIsAaveModalOpen(true)
    } else if (protocol === "MakerDAO" && type === "Collateral Pools") {
      setIsMakerDAOModalOpen(true)
    } else if (protocol === "Curve" && type === "Liquidity Pools") {
      setIsCurveModalOpen(true)
    } else if (protocol === "Compound" && type === "Collateral Pools") {
      setIsCompoundModalOpen(true)
    } else if (protocol === "Rocket Pool" && type === "Staking Pools") {
      setIsRocketPoolModalOpen(true)
    } else {
      // Handle other protocols/actions here
      console.log(`Action for ${protocol} - ${type}`)
    }
  }

  const filteredPools = activeCategory === "all" ? poolsData : poolsData.filter((pool) => pool.type === activeCategory)

  const getProtocolIcon = (protocol: string) => {
    const iconMap: { [key: string]: string } = {
      Lido: "/icons/lido.png",
      Uniswap: "/icons/uniswap.png",
      Aave: "/icons/aave.png",
      MakerDAO: "/icons/makerdao.png",
      Curve: "/icons/curve.png",
      Compound: "/icons/compound.png",
      Convex: "/icons/convex.png",
      Yearn: "/icons/yearn.png",
    }
    return iconMap[protocol] || null
  }

  const getPoolIcon = (type: string) => {
    switch (type) {
      case "Staking Pools":
        return Shield
      case "Liquidity Pools":
        return BarChart3
      case "Yield Farming":
        return TrendingUp
      case "Collateral Pools":
        return Coins
      default:
        return Activity
    }
  }

  const getActionText = (type: string) => {
    switch (type) {
      case "Staking Pools":
        return "Stake Now"
      case "Liquidity Pools":
        return "Add Liquidity"
      case "Yield Farming":
        return "Farm Yield"
      case "Collateral Pools":
        return "Supply Collateral"
      default:
        return "Interact"
    }
  }

  const renderPoolContent = () => {
    if (filteredPools.length === 0) {
      return (
        <div className="text-center py-20">
          <div className="animate-pulse-glow p-8 rounded-2xl bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-400/20 max-w-md mx-auto">
            <Clock className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <p className="text-gray-300 text-lg font-medium">No pools found for this category</p>
            <p className="text-green-400/70 text-sm mt-2">Try selecting a different category</p>
          </div>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPools.map((pool, index) => {
          const IconComponent = getPoolIcon(pool.type)
          const protocolIcon = getProtocolIcon(pool.protocol)
          return (
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
                          {protocolIcon ? (
                            <Image
                              src={protocolIcon || "/placeholder.svg"}
                              alt={`${pool.protocol} icon`}
                              width={20}
                              height={20}
                              className="w-5 h-5"
                            />
                          ) : (
                            <IconComponent className="w-5 h-5 text-green-400" />
                          )}
                        </div>
                        {pool.protocol}
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </CardTitle>
                    <Badge className="w-fit bg-green-900/50 text-green-300 border border-green-400/40 text-xs">
                      {pool.type}
                    </Badge>
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
                          APR/APY
                        </div>
                        <Badge className="text-lg font-bold bg-gradient-to-r from-green-500/30 to-green-600/20 text-green-300 border border-green-400/40 px-3 py-1">
                          {pool.apr_apy}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/5 border border-green-400/20">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Activity className="w-4 h-4 text-green-400" />
                        24h Volume
                      </div>
                      <span className="font-semibold text-white">{pool["24h_volume"]}</span>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 border border-green-400/20 hover:border-green-300/30 group"
                      onClick={() => handleStakeAction(pool.protocol, pool.type)}
                    >
                      <span className="flex items-center gap-2">
                        {getActionText(pool.type)}
                        <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                      </span>
                    </Button>
                  </CardContent>
                </Card>
              </MagicCard>
            </div>
          )
        })}
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
      <LidoStakingModal isOpen={isLidoModalOpen} onClose={() => setIsLidoModalOpen(false)} />
      <UniswapModal isOpen={isUniswapModalOpen} onClose={() => setIsUniswapModalOpen(false)} />
      <AaveModal isOpen={isAaveModalOpen} onClose={() => setIsAaveModalOpen(false)} />
      <MakerDAOModal isOpen={isMakerDAOModalOpen} onClose={() => setIsMakerDAOModalOpen(false)} />
      <CurveModal isOpen={isCurveModalOpen} onClose={() => setIsCurveModalOpen(false)} />
      <CompoundModal isOpen={isCompoundModalOpen} onClose={() => setIsCompoundModalOpen(false)} />
      <RocketPoolModal isOpen={isRocketPoolModalOpen} onClose={() => setIsRocketPoolModalOpen(false)} />
    </div>
  )
}
