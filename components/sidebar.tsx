"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart3, ArrowLeftRight, TrendingUp, User, Shield, Wallet, UserCircle, Trophy, Award } from "lucide-react"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const navigationItems = [
  { id: "pools", label: "Pools", icon: BarChart3, description: "Liquidity & Staking" },
  { id: "swaps", label: "Swaps", icon: ArrowLeftRight, description: "Token Exchange" },
  { id: "dex", label: "DEX", icon: TrendingUp, description: "Decentralized Trading" },
  { id: "for-you", label: "For You", icon: User, description: "Personalized" },
  { id: "verify", label: "Verify", icon: Shield, description: "Authentication" },
  { id: "mint-badge", label: "Mint Badge", icon: Award, description: "Create Monthly Badge" },
  { id: "leaderboard", label: "Leaderboard", icon: Trophy, description: "Monthly XP Ranks" },
  { id: "profile", label: "Profile", icon: UserCircle, description: "Account & History" },
]

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="w-72 bg-gradient-to-b from-black via-gray-900 to-black border-r border-gray-700/30 flex flex-col backdrop-blur-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 via-transparent to-emerald-950/5" />

      {/* Logo and App Name */}

      {/* Navigation */}
      <nav className="relative flex-1 p-6 space-y-2">
        <div className="mb-8"></div>

        {navigationItems.map((item, index) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          return (
            <div key={item.id} className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left rounded-xl transition-all duration-300 h-16 p-4 group relative overflow-hidden",
                  isActive
                    ? "bg-gradient-to-r from-emerald-900/30 to-emerald-800/20 text-emerald-200 border border-emerald-700/40 shadow-lg"
                    : "text-gray-400 hover:bg-emerald-900/20 hover:text-emerald-300 border border-transparent hover:border-emerald-700/30",
                )}
                onClick={() => onSectionChange(item.id)}
              >
                <div className="relative flex items-center w-full">
                  <div
                    className={cn(
                      "p-2 rounded-lg mr-4 transition-all duration-300",
                      isActive
                        ? "bg-emerald-800/30 border border-emerald-700/40"
                        : "bg-gray-800/50 border border-gray-700/50 group-hover:bg-emerald-900/20 group-hover:border-emerald-700/30",
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5 transition-all duration-300",
                        isActive ? "text-emerald-300" : "text-gray-400 group-hover:text-emerald-400",
                      )}
                    />
                  </div>

                  <div className="flex-1">
                    <div
                      className={cn(
                        "font-semibold transition-colors duration-300",
                        isActive ? "text-emerald-200" : "text-gray-300 group-hover:text-emerald-300",
                      )}
                    >
                      {item.label}
                    </div>
                    <div
                      className={cn(
                        "text-xs transition-colors duration-300",
                        isActive ? "text-emerald-400/60" : "text-gray-500 group-hover:text-emerald-400/60",
                      )}
                    >
                      {item.description}
                    </div>
                  </div>

                  {isActive && <div className="w-2 h-2 bg-emerald-400/80 rounded-full" />}
                </div>
              </Button>
            </div>
          )
        })}
      </nav>

      <div className="relative p-6 border-t border-gray-700/30 bg-gradient-to-r from-emerald-900/10 to-transparent">
        <div className="p-4 rounded-xl bg-emerald-900/20 border border-emerald-700/30 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-800/30 border border-emerald-700/40">
              {/* <Wallet className="w-5 h-5 text-emerald-300" /> */}
            </div>
            <div className="flex-1">
              <appkit-button />
            </div>
            {/* <div className="w-2 h-2 bg-emerald-400/80 rounded-full" /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
