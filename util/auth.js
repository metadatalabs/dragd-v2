import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import { ethers } from "ethers";

const sessionOptions = {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "dragd_session",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: false, // process.env.NODE_ENV === "production",
  },
};

export function withSessionRoute(handler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, sessionOptions);
}

let url = "https://rpc.flashbots.net";
let provider = new ethers.providers.JsonRpcProvider(url);

const whitelistedAccountDomains = {
  "prnth.eth": ["index", "docs.eth", "loveposters.eth", "nounshack.eth"],
  "0xlok.eth": ["l.eth", "loveposters.eth"],
  "salmanneedsajob.eth": ["nounshack.eth"],
};
export const getBlockchainNames = async (address) => {
  // const res = await fetch(`https://api.opensea.io/api/v1/assets?owner=${address}&order_direction=desc&offset=0&limit=20`);
  // const json = await res.json();
  // return json.assets.map(asset => asset.name);
  var addresses = [address];
  let ensName;

  if (address && ethers.utils.isAddress(address)) {
    try {
      ensName = await getData(address);
    } catch (e) {
      console.log(e);
    }
  }

  if (ensName) addresses.push(ensName);

  if (ensName && Object.keys(whitelistedAccountDomains).includes(ensName)) {
    addresses = [...addresses, ...whitelistedAccountDomains[ensName]];
  }

  return addresses;
};

const cache = {};
const cacheLimit = 20;
const cacheTime = 10 * 60 * 1000; // 10 minutes in milliseconds

function getCachedData(key) {
  const cached = cache[key];
  if (cached && Date.now() - cached.timestamp < cacheTime) {
    return cached.data;
  }
  delete cache[key];
}

function setCachedData(key, data) {
  if (Object.keys(cache).length >= cacheLimit) {
    const oldestKey = Object.keys(cache).reduce((a, b) =>
      cache[a].timestamp < cache[b].timestamp ? a : b
    );
    delete cache[oldestKey];
  }
  cache[key] = {
    data,
    timestamp: Date.now(),
  };
}

async function getDataFromApi(address) {
  // implement the code to get data from the API
  return await provider.lookupAddress(address);
}

async function getData(key) {
  const cachedData = getCachedData(key);
  if (cachedData) {
    return Promise.resolve(cachedData);
  }
  const apiData = await getDataFromApi(key);
  setCachedData(key, apiData);
  return apiData;
}
