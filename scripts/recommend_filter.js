
const BASE_URL = "https://api.geckoterminal.com/api/v2";

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

      // console.log(`${name} [${dexName}] => ${poolId}, ${liq}, ${vol}`);
      const innerResult = {
        name: name,
        dexName: dexName,
        liquidity: liq,
        volume: vol
      }
      outerResult[poolId] = innerResult;
    }
    return JSON.stringify(outerResult);
    

  } catch (err) {
    // console.error("Error:", err.message);
    return { error: err.message };
  }
}

