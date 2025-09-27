"use client"

import type React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Shield, BarChart3, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface Task {
  id: string
  title: string
  description: string
  xp: number
  completed: boolean
  icon: React.ComponentType<{ className?: string }>
}

const tasks: Task[] = [
  {
    id: "1",
    title: "Stake in 2 protocols this week",
    description: "Complete staking transactions in at least 2 different protocols",
    xp: 50,
    completed: true,
    icon: Shield,
  },
  {
      id: "2",
      title: "Add liquidity to 3 pools",
      description: "Provide liquidity to 3 different liquidity pools",
      xp: 75,
      completed: true,
      icon: undefined
  },
  {
    id: "3",
    title: "Complete first DeFi transaction",
    description: "Make your first transaction on any DeFi protocol",
    xp: 25,
    completed: false,
    icon: Zap,
  },
  {
    id: "4",
    title: "Reach $1000 TVL milestone",
    description: "Have a total value locked of at least $1000 across all protocols",
    xp: 100,
    completed: false,
    icon: TrendingUp,
  },
]

interface XPEarnModalProps {
  isOpen: boolean
  onClose: () => void
}

export function XPEarnModal({ isOpen, onClose }: XPEarnModalProps) {
  const totalXP = tasks.reduce((sum, task) => sum + (task.completed ? task.xp : 0), 0)
  const totalPossibleXP = tasks.reduce((sum, task) => sum + task.xp, 0)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-gradient-to-br from-green-900/95 via-green-800/90 to-green-900/95 border border-green-400/30 backdrop-blur-xl">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-green-500/20 border border-green-400/30">
              <Star className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-green-300">Earn XP</h2>
              <p className="text-sm text-gray-400">Complete tasks to earn experience points</p>
            </div>
          </div>

          <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-400/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Progress</span>
              <span className="text-sm font-semibold text-green-300">
                {totalXP} / {totalPossibleXP} XP
              </span>
            </div>
            <div className="w-full bg-green-900/50 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(totalXP / totalPossibleXP) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => {
              const IconComponent = task.icon || BarChart3
              return (
                <div
                  key={task.id}
                  className={cn(
                    "p-4 rounded-xl border transition-all duration-300",
                    task.completed
                      ? "bg-green-500/10 border-green-400/30 shadow-lg shadow-green-500/10"
                      : "bg-green-500/5 border-green-400/20 hover:bg-green-500/8",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "p-2 rounded-lg border flex-shrink-0",
                        task.completed ? "bg-green-500/20 border-green-400/40" : "bg-green-500/10 border-green-400/20",
                      )}
                    >
                      {task.completed ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <IconComponent className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3
                          className={cn("font-semibold text-sm", task.completed ? "text-green-300" : "text-gray-300")}
                        >
                          {task.title}
                        </h3>
                        <Badge
                          className={cn(
                            "text-xs font-bold",
                            task.completed
                              ? "bg-green-500/30 text-green-300 border-green-400/40"
                              : "bg-green-900/50 text-green-400 border-green-400/30",
                          )}
                        >
                          {task.xp} XP
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">{task.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <Button
            onClick={onClose}
            className="w-full mt-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 border border-green-400/20 hover:border-green-300/30"
          >
            Continue Earning
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
