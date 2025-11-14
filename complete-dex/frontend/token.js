// frontend/tokens.js
const SUPPORTED_TOKENS = {
  "ETH": {
    address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", 
    symbol: "ETH",
    decimals: 18,
    name: "Ethereum"
  },
  "USDT": {
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    symbol: "USDT",
    decimals: 6,
    name: "Tether USD"
  },
  "USDC": {
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    symbol: "USDC",
    decimals: 6,
    name: "USD Coin"
  },
  "DAI": {
    address: "0x6b175474e89094c44da98b954eedeac495271d0f",
    symbol: "DAI",
    decimals: 18,
    name: "Dai Stablecoin"
  },
  "WBTC": {
    address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    symbol: "WBTC",
    decimals: 8,
    name: "Wrapped Bitcoin"
  }
};


function getTokenByAddress(address) {
  for (const [symbol, token] of Object.entries(SUPPORTED_TOKENS)) {
    if (token.address.toLowerCase() === address.toLowerCase()) {
      return token;
    }
  }
  return null;
}

// list all tokens 
function getAllTokens() {
  return Object.values(SUPPORTED_TOKENS);
}
