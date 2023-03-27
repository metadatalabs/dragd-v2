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
export const getBlockchainNames = async (address) => {
  // const res = await fetch(`https://api.opensea.io/api/v1/assets?owner=${address}&order_direction=desc&offset=0&limit=20`);
  // const json = await res.json();
  // return json.assets.map(asset => asset.name);
  const addresses = [address];
  let ensName;
  
  if (address && ethers.utils.isAddress(address)) {
    try {
      ensName = await provider.lookupAddress(address);
      const resolver = ensName ? await provider.getResolver(ensName) : null;
      let avatar = resolver ? await resolver.getAvatar() : null;
    } catch (e) {
      console.log(e);
    }
  }
  
  if(ensName) addresses.push(ensName);
  
  return addresses;
}