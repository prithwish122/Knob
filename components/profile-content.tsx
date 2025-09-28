"use client"

import { Button } from "@/components/ui/button"
import { MagicCard } from "@/components/ui/magic-card"
import { ExternalLink, ArrowUpRight, ArrowDownLeft, Clock, Globe } from "lucide-react"
import { SynapseStorage } from "../SynapseSetup/Synapse"
// Mock transaction data



const storage = new SynapseStorage();

await storage.initialize();

const retrieved = await storage.retrieveData("bafkzcibckubstyilwooeyudqa55rs2rsm7rinx2jfaryya6cu6cibhqyl2vgmfy");
console.log(retrieved);

const retrieved2 = await storage.retrieveData("bafkzcibcj4bqlejeztaoq643r4pb2tajcdrwhqb5scxkxazjpc6bn66lslgfshq");

const retrieved3 = await storage.retrieveData("bafkzcibckeb6qiyespdraawku7m2th6dlcso443pv2byybhhy6tnf5q5u35hcmi");



const mockTransactions = [
  {
    // id: "0x1a2b3c...",
    type: retrieved.txType,
    from: retrieved.protocol,
    // to: "WETH",
    amount: `$ ${retrieved.amount}`,
    // value: "$1,500.00",
    timestamp: "2 hours ago",
    status: "completed",
  },
  {
    // id: "0x1a2b3c...",
    type: retrieved2.txType,
    from: retrieved2.protocol,
    // to: "WETH",
    amount: `$ ${retrieved2.amount}`,
    // value: "$1,500.00",
    timestamp: "2 hours ago",
    status: "completed",
  },
  
]

export function ProfileContent() {
  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-black via-gray-900 to-black min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
          <p className="text-gray-400">Manage your account and view transaction history</p>
        </div>

        {/* ENS Button */}
        <Button
          className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white border-0 shadow-lg"
          size="lg"
        >
          <Globe className="w-4 h-4 mr-2" />
          Link ENS
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Account Overview */}
        <div className="lg:col-span-1">
          <MagicCard className="p-6 bg-gradient-to-br from-gray-900/50 to-black/50 border-emerald-700/30">
            <h2 className="text-xl font-semibold text-white mb-6">Account Overview</h2>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-emerald-900/20 border border-emerald-700/30">
                <div className="text-sm text-emerald-400 mb-1">Wallet Address</div>
                <div className="text-white font-mono text-sm">0x742d...4B73</div>
              </div>

              <div className="p-4 rounded-lg bg-emerald-900/20 border border-emerald-700/30">
                <div className="text-sm text-emerald-400 mb-1">ENS Domain</div>
                <div className="text-gray-400 text-sm">Not linked</div>
              </div>

              <div className="p-4 rounded-lg bg-emerald-900/20 border border-emerald-700/30">
                <div className="text-sm text-emerald-400 mb-1">Total Transactions</div>
                <div className="text-white font-semibold text-lg">247</div>
              </div>

              
            </div>
          </MagicCard>
        </div>

        {/* Transaction History */}
        <div className="lg:col-span-2">
          <MagicCard className="p-6 bg-gradient-to-br from-gray-900/50 to-black/50 border-emerald-700/30">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
              <Button
                variant="outline"
                size="sm"
                className="border-emerald-700/50 text-emerald-400 hover:bg-emerald-900/20 bg-transparent"
              >
                View All
              </Button>
            </div>

            <div className="space-y-3">
              {mockTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="p-4 rounded-lg bg-black/30 border border-gray-700/30 hover:border-emerald-700/50 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-900/30 border border-emerald-700/40">
                        {tx.type === "swap" ? (
                          <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                        ) : tx.type === "add_liquidity" ? (
                          <ArrowDownLeft className="w-4 h-4 text-blue-400" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-orange-400" />
                        )}
                      </div>

                      <div>
                        <div className="text-white font-medium">
                          {tx.type === "swap"
                            ? "Swap"
                            : tx.type === "add_liquidity"
                              ? "Add Liquidity"
                              : "Remove Liquidity"}
                        </div>
                        <div className="text-sm text-gray-400">
                          {tx.from}  {tx.to}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-white font-medium">
                        {tx.amount} {tx.from}
                      </div>
                      <div className="text-sm text-gray-400">{tx.value}</div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        {tx.timestamp}
                      </div>
                      <div className="text-xs text-emerald-400 capitalize">{tx.status}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MagicCard>
        </div>
      </div>
    </div>
  )
}
