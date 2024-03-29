FROM node:lts-alpine AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json /app/package.json  
COPY package-lock.json /app/package-lock.json
RUN npm install

# Rebuild the source code only when needed
FROM node:lts-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

# Read env variables from github and write to .env.local
RUN --mount=type=secret,id=BASE_SITE echo "BASE_SITE=$(cat /run/secrets/BASE_SITE)" >> /app/.env.local
RUN --mount=type=secret,id=MONGO_STRING echo "MONGO_STRING=$(cat /run/secrets/MONGO_STRING)" >> /app/.env.local
RUN --mount=type=secret,id=MONGO_STRING \
    npm run moser-build `cat /run/secrets/MONGO_STRING` & \
    npm run build && \
    npm install

# Production image, copy all the files and run next
FROM node:lts-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env.local ./.env.local

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]
