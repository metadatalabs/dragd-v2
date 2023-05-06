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
  "0x88289ac519eFb1cba5F522970E63264a969BeD06": [
    "index",
    "docs.eth",
    "loveposters.eth",
    "nounshack.eth",
  ],
  "0xE5E98Df807c3C4F8e57eeeED0968895b2EA5FEfb": ["l.eth", "loveposters.eth"],
  "0x4DF83971f6f1bFD8D33a2E79584bDFDe75F4DF60": ["nounshack.eth"],
};
export const getBlockchainNames = async (address) => {
  // const res = await fetch(`https://api.opensea.io/api/v1/assets?owner=${address}&order_direction=desc&offset=0&limit=20`);
  // const json = await res.json();
  // return json.assets.map(asset => asset.name);
  var addresses = [address];
  let ensNames;

  if (address && ethers.utils.isAddress(address)) {
    try {
      ensNames = await getData(address);
    } catch (e) {
      console.log(e);
    }
  }

  if (ensNames) addresses = [...addresses, ...ensNames];

  if (address && Object.keys(whitelistedAccountDomains).includes(address)) {
    addresses = [...addresses, ...whitelistedAccountDomains[address]];
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

  // const defaultName = await provider.lookupAddress(address);
  const graphNames = await getNamesFromGraph(address);
  return [graphNames];
}

async function getNamesFromGraph(address) {
  const graphNames = await fetch(
    "https://api.thegraph.com/subgraphs/name/ensdomains/ens",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        {
          accounts(where: {id: "${address.toLowerCase()}"}) {
            wrappedDomains {
              name
            }
            domains {
              name
            }
          }
        }
        `,
      }),
    }
  );
  const res = (await graphNames.json()).data.accounts[0];

  var domains = [];
  if (res?.domains?.length > 0)
    res.domains.map((domain) => domains.push(domain.name));
  if (res?.wrappedDomains?.length > 0)
    res.wrappedDomains.map((domain) => domains.push(domain.name));

  return domains;
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
