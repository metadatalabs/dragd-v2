import { fetchEnsName } from "@wagmi/core";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

const sessionOptions = {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "myapp_cookiename",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export function withSessionRoute(handler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, sessionOptions);
}

export const getBlockchainNames = async (address) => {
  // const res = await fetch(`https://api.opensea.io/api/v1/assets?owner=${address}&order_direction=desc&offset=0&limit=20`);
  // const json = await res.json();
  // return json.assets.map(asset => asset.name);
  const addresses = [address];
  const ensName = await fetchEnsName({
    address: address,
  })
  if(ensName) addresses.push(ensName);
  
  return addresses;
}