
const BASE_URL = "https://api.geckoterminal.com/api/v2";


function getFeePercent(name) {
  // 1. parsing from pool name
  // const name = pool.attributes?.name || "";
  const match = name.match(/(\d+(\.\d+)?)%/);
  if (match) return parseFloat(match[1]) / 100;

  // 2. pool_details field
  // const feeStr = poolDetails.data.attributes?.pool_fee_percentage;
  // if (feeStr) return parseFloat(feeStr) / 100;

  // 3. Default assumption
  return 0.003; 
}


async function getPoolDetails(network = "eth", poolAddress) {
    const url = `${BASE_URL}/networks/${network}/pools/${poolAddress}`;
    const res = await fetch(url);
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`HTTP ${res.status} - ${errText}`);
    }
    return res.json();
  }


async function getTopPools(network = "eth", page = 1) {
  const url = `${BASE_URL}/networks/${network}/pools?page=${page}`;
  const res = await fetch(url);
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`HTTP ${res.status} - ${errText}`);
  }
  return res.json();
}


async function main() {
  try {
    const pools = await getTopPools("eth");
    const outerResult = {};

    for (const pool of pools.data) {
      const poolId = pool.id.replace(/^eth_/, "");
      const name = pool.attributes?.name;

      const poolDetails = await getPoolDetails('eth', poolId)
      const dexName = poolDetails.data.relationships.dex.data.id || "Unknown DEX";
      const liq = pool.attributes.reserve_in_usd;
      const vol = pool.attributes.volume_usd.h24;

      const feePercent = getFeePercent(name);
      let apr = null;
      if (liq > 0 && vol > 0) {
        const dailyFees = vol * feePercent;
        const dailyReturn = dailyFees / liq;
        apr = (dailyReturn * 365 * 100).toFixed(2); // percentage
      }

      let tag;
      if (name.includes("USDC") || name.includes("USDT") || name.includes("DAI"))
        tag = 'Stable Coin User'
      else if (liq>1000000)
        tag = 'Liquidity Provider';
      else if (liq>500000 && vol>200000)
        tag = 'Trader';
      else
        tag = 'Risk Taker'
      

      // console.log(`${name} [${dexName}] => ${poolId}, ${liq}, ${vol}, ${apr}, ${tag}`);
      const innerResult = {
        name: name,
        dexName: dexName,
        liquidity: liq,
        volume: vol,
        apr: apr,
        tag: tag
      }
      outerResult[poolId] = innerResult;
    }
    // console.log(outerResult);
    return outerResult;
    

  } catch (err) {
    // console.error("Error:", err.message);
    return { error: err.message };
  }
}

// main()