import { NextRequest, NextResponse } from 'next/server';
import { ethers } from 'ethers';

export function middleware(req) {
  const domain = "dra.gd";

  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/api') || //  exclude all API routes
    pathname.startsWith('/static') || // exclude static files
    pathname.includes('.') // exclude all files in the public folder
  ) {
    return NextResponse.next();
  }

  var hostname = req?.headers?.get('host');
  const whitelistDomain = [domain, `www.${domain}`, `localhost:3000`];

  const web2DomainMapping = {
    'prnth.com': 'prnth.eth',
    'xyz.com': 'anydragdpage',
    'nuttertools.com': '0xE5E98Df807c3C4F8e57eeeED0968895b2EA5FEfb'
  }

  if (hostname && !whitelistDomain.includes(hostname)) {
    var domainToPath;

    if(Object.keys(web2DomainMapping).includes(hostname))
      domainToPath = web2DomainMapping[hostname] 
    else{
      domainToPath = hostname?.split('.')[0]; // get only the first part of the domain

      if(!ethers.utils.isAddress(domainToPath))
        domainToPath = domainToPath + ".eth";
    }
      
    const url = req.nextUrl.clone();

    req.nextUrl.pathname = `${[domainToPath, url.pathname].join('')}`;

    console.log("[DRAGD LOG] rewriting to", req.nextUrl.pathname)
    return NextResponse.rewrite(req.nextUrl);
  }

  return NextResponse.next();
}