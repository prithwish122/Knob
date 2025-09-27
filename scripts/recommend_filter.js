const API_BASE = "https://api.geckoterminal.com/api/v2";
const NETWORK = "eth";

// Fetch trending pools from GeckoTerminal
async function getTrendingPools() {
  const url = `${API_BASE}/networks/${NETWORK}/trending_pools`;
  const resp = await fetch(url, { headers: { "Accept": "application/json" } });
  if (!resp.ok) throw new Error(`Error fetching pools: ${resp.status}`);
  return await resp.json();
}

// Recommend pools based on user type
function recommendPools(pools, userType) {
  const data = pools.data.map(d => {
    return {
      id: d.id,
      name: d.attributes.name,
      liquidity: parseFloat(d.attributes.reserve_in_usd || 0),
      volume24h: parseFloat(d.attributes.volume_usd?.h24 || 0),
      feeApr: parseFloat(d.attributes.fee_apr || 0),
      rewardApr: parseFloat(d.attributes.reward_apr || 0),
      baseToken: d.attributes.base_token?.symbol,
      quoteToken: d.attributes.quote_token?.symbol
    };
  });

  switch (userType.toLowerCase()) {
    case "lp": // Liquidity Provider
      return data
        .filter(p => p.liquidity > 1_000_000) // deep pools
        .sort((a, b) => b.feeApr - a.feeApr)   // higher APR first
        .slice(0, 5);

    case "trader":
      return data
        .filter(p => p.liquidity > 500_000 && p.volume24h > 200_000)
        .sort((a, b) => b.volume24h - a.volume24h)
        .slice(0, 5);

    case "yield":
      return data
        .filter(p => p.feeApr + p.rewardApr > 10) // >10% APY
        .sort((a, b) => (b.feeApr + b.rewardApr) - (a.feeApr + a.rewardApr))
        .slice(0, 5);

    case "stable":
      return data
        .filter(p => ["USDC", "USDT", "DAI"].includes(p.baseToken) || ["USDC", "USDT", "DAI"].includes(p.quoteToken))
        .sort((a, b) => b.liquidity - a.liquidity)
        .slice(0, 5);

    case "degen":
      return data
        .sort((a, b) => (b.volume24h / (b.liquidity + 1)) - (a.volume24h / (a.liquidity + 1))) // hype factor
        .slice(0, 5);

    default:
      return data.slice(0, 5);
  }
}

// Example usage
(async () => {
  try {
    const trending = await getTrendingPools();
    const lpPools = recommendPools(trending, "lp");
    const traderPools = recommendPools(trending, "trader");
    const yieldPools = recommendPools(trending, "yield");
    const stablePools = recommendPools(trending, "stable");
    const degenPools = recommendPools(trending, "degen");

    console.log("👨‍🌾 LP Picks:", lpPools);
    console.log("💱 Trader Picks:", traderPools);
    console.log("📈 Yield Picks:", yieldPools);
    console.log("💵 Stablecoin Pools:", stablePools);
    console.log("🎲 Degen Pools:", degenPools);

  } catch (err) {
    console.error("Error:", err);
  }
})();