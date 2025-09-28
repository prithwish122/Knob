"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Leader = {
  id: number
  name: string
  exp: number
}

function tierForExp(exp: number) {
  if (exp >= 10000) return "Diamond"
  if (exp >= 5000) return "Gold"
  if (exp >= 1000) return "Silver"
  return "Bronze"
}

function badgeColor(tier: string) {
  switch (tier) {
    case "Diamond":
      return "from-cyan-300/30 to-emerald-300/20 border-cyan-300/30 text-cyan-200"
    case "Gold":
      return "from-yellow-300/30 to-emerald-300/10 border-yellow-300/30 text-yellow-200"
    case "Silver":
      return "from-slate-300/30 to-emerald-300/10 border-slate-300/30 text-slate-200"
    default:
      return "from-amber-600/30 to-emerald-300/10 border-amber-600/40 text-amber-200"
  }
}

const MOCK: Leader[] = [
  { id: 1, name: "0xA…12c9", exp: 14250 },
  { id: 2, name: "0xF…9bd3", exp: 9850 },
  { id: 3, name: "0x3…aa01", exp: 6120 },
  { id: 4, name: "0x7…00ef", exp: 2750 },
  { id: 5, name: "0x9…19af", exp: 880 },
  { id: 6, name: "0xB…77aa", exp: 450 },
]

export function LeaderboardPanel() {
  const leaders = [...MOCK].sort((a, b) => b.exp - a.exp)

  return (
    <section className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-semibold text-emerald-200">Monthly Leaderboard</h2>
        <p className="text-sm text-emerald-400/70">Ranked by XP earned this month</p>
      </div>

      <div className="space-y-4">
        {leaders.map((u, idx) => {
          const tier = tierForExp(u.exp)
          return (
            <Card
              key={u.id}
              className={cn(
                "rounded-2xl p-6 border bg-gradient-to-b w-full",
                "from-emerald-900/20 to-gray-900/40 border-emerald-800/30",
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-emerald-900/40 border border-emerald-800/40 flex items-center justify-center">
                    <span className="text-emerald-300 text-sm font-semibold">#{idx + 1}</span>
                  </div>
                  <div>
                    <div className="text-emerald-200 font-semibold">{u.name}</div>
                    <div className="text-xs text-emerald-400/70">EXP: {u.exp.toLocaleString()}</div>
                  </div>
                </div>
                <div
                  className={cn("px-3 py-1 rounded-full text-xs border bg-gradient-to-r", badgeColor(tier))}
                  aria-label={`Tier ${tier}`}
                >
                  {tier}
                </div>
              </div>
              <div className="mt-6 h-2 w-full rounded-full bg-emerald-900/40 overflow-hidden">
                <div
                  className="h-2 bg-emerald-500"
                  style={{ width: `${Math.min(100, (u.exp / (leaders[0].exp || 1)) * 100)}%` }}
                />
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
