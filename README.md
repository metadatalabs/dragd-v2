This repo contains the code for [dra.gd](https://dra.gd/), a decentralised website builder.

[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the server:

```bash
# dev mode
npm run dev
# live mode:
npm run build && npm run start
# static export mode
npm run build-static && npm run export
# static builder API mode
npm run builder
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Create a file called `.env.local` that contains the following env variables:
```
MONGO_STRING=
WEB3_STORAGE_KEY=
BASE_SITE=index
```
