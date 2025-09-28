"use client"

import useSWR from "swr"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

type Tx = {
  id: string
  type: "swap" | "stake" | "lend" | "borrow"
  amountUSD: number
  timestamp: string
}
type MintData = {
  address: string
  month: string
  exp: number
  transactions: Tx[]
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function tierForExp(exp: number) {
  if (exp >= 10000) return "Diamond"
  if (exp >= 5000) return "Gold"
  if (exp >= 1000) return "Silver"
  return "Bronze"
}

function badgeImageForTier(tier: string) {
  switch (tier) {
    case "Diamond":
      return "/diamond-badge.png"
    case "Gold":
      return "/gold-badge.png"
    case "Silver":
      return "/silver-badge.jpg"
    default:
      return "/bronze-badge.jpg"
  }
}

export function MintBadgePanel() {
  const { data, error, isLoading } = useSWR<MintData>("/api/mint-data", fetcher)
  const [metadata, setMetadata] = useState<any | null>(null)
  const { toast } = useToast()

  const derived = useMemo(() => {
    if (!data) return null
    const tier = tierForExp(data.exp)
    return {
      name: `${tier} Activity Badge - ${data.month}`,
      description: `Awarded for earning ${data.exp} XP in ${data.month}.`,
      image: badgeImageForTier(tier),
      attributes: [
        { trait_type: "tier", value: tier },
        { trait_type: "xp_month", value: data.exp },
        { trait_type: "address", value: data.address },
        { trait_type: "transactions", value: data.transactions.length },
      ],
      external_url: "https://example.com/badge",
    }
  }, [data])

  const handleGenerate = () => {
    if (!derived) return
    // Only use fetched JSON to form metadata
    setMetadata(derived)
  }

  const handleMint = async () => {
    if (!metadata) return
    // Mock mint request
    console.log("[v0] Minting with metadata:", metadata)
    toast({ title: "Badge minted", description: "Your monthly badge has been minted successfully." })
  }

  return (
    <section className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-semibold text-emerald-200">Mint Badge</h2>
        <p className="text-sm text-emerald-400/70">Generate metadata from your monthly activity</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: Transaction History (default visible) */}
        <Card className="rounded-2xl p-6 border bg-gradient-to-b from-emerald-900/20 to-gray-900/40 border-emerald-800/30 xl:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-emerald-200 font-semibold">Transaction History</h3>
            <div className="text-xs text-emerald-400/70">{isLoading ? "Loading..." : data ? data.month : ""}</div>
          </div>

          {error && <div className="mt-6 text-sm text-red-300">Failed to fetch transaction data.</div>}

          <div className="mt-6 space-y-3">
            {(data?.transactions ?? []).map((tx) => (
              <div
                key={tx.id}
                className={cn(
                  "flex items-center justify-between rounded-xl px-4 py-3 border",
                  "bg-emerald-950/30 border-emerald-800/40",
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-emerald-900/40 border border-emerald-800/40" />
                  <div>
                    <div className="text-sm text-emerald-200 font-medium capitalize">{tx.type}</div>
                    <div className="text-xs text-emerald-400/70">{new Date(tx.timestamp).toLocaleString()}</div>
                  </div>
                </div>
                <div className="text-emerald-200 font-semibold">
                  ${tx.amountUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>
            ))}

            {!isLoading && data && data.transactions.length === 0 && (
              <div className="text-sm text-emerald-400/70">No transactions this month.</div>
            )}
          </div>
        </Card>

        {/* Right: Metadata + Actions */}
        <Card className="rounded-2xl p-6 border bg-gradient-to-b from-emerald-900/20 to-gray-900/40 border-emerald-800/30">
          <h3 className="text-emerald-200 font-semibold">Metadata</h3>
          <p className="mt-1 text-xs text-emerald-400/70">
            By default, you see your transaction history. Generate metadata first, then mint your badge.
          </p>

          <div className="mt-4 flex gap-2">
            <Button
              className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-emerald-50"
              onClick={handleGenerate}
              disabled={!derived}
            >
              Generate Metadata
            </Button>
            <Button
              variant="outline"
              className="rounded-xl border-emerald-700/40 text-emerald-200 hover:bg-emerald-900/30 bg-transparent"
              onClick={handleMint}
              disabled={!metadata}
            >
              Mint Badge
            </Button>
          </div>

          {/* Preview */}
          <div className="mt-6 rounded-xl p-4 bg-emerald-950/30 border border-emerald-800/40">
            {!metadata ? (
              <div className="text-sm text-emerald-400/70">
                Click "Generate Metadata" to create metadata from the fetched JSON.
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={metadata.image || "/placeholder.svg"}
                    alt="Badge preview"
                    className="h-20 w-20 rounded-xl border border-emerald-800/40 object-cover"
                  />
                  <div>
                    <div className="text-emerald-200 font-semibold">{metadata.name}</div>
                    <div className="text-xs text-emerald-400/70">{metadata.description}</div>
                  </div>
                </div>

                <pre className="text-xs leading-6 text-emerald-200 whitespace-pre-wrap">
                  {JSON.stringify(metadata, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  )
}
