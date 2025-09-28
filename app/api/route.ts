import { NextResponse } from "next/server"

export async function GET() {
  // Mock monthly activity. Only this JSON is used to build metadata.
  const now = Date.now()
  const days = (n: number) => new Date(now - 86400000 * n).toISOString()

  const payload = {
    address: "0x1234...ABCD",
    month: new Date().toLocaleString("en-US", { month: "long", year: "numeric" }),
    exp: 7820,
    transactions: [
      { id: "tx_001", type: "swap", amountUSD: 320.12, timestamp: days(1) },
      { id: "tx_002", type: "stake", amountUSD: 1200.0, timestamp: days(2) },
      { id: "tx_003", type: "lend", amountUSD: 540.35, timestamp: days(3) },
      { id: "tx_004", type: "borrow", amountUSD: 210.0, timestamp: days(4) },
      { id: "tx_005", type: "swap", amountUSD: 980.55, timestamp: days(5) },
      { id: "tx_006", type: "stake", amountUSD: 450.0, timestamp: days(6) },
      { id: "tx_007", type: "lend", amountUSD: 275.25, timestamp: days(7) },
      { id: "tx_008", type: "swap", amountUSD: 149.99, timestamp: days(8) },
      { id: "tx_009", type: "borrow", amountUSD: 600.0, timestamp: days(9) },
      { id: "tx_010", type: "lend", amountUSD: 1320.75, timestamp: days(10) },
      { id: "tx_011", type: "stake", amountUSD: 200.0, timestamp: days(12) },
      { id: "tx_012", type: "swap", amountUSD: 75.48, timestamp: days(14) },
    ],
  }
  return NextResponse.json(payload)
}
