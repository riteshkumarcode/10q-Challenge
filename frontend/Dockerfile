# Multi-Stage Dockerfile for 10Q Challenge Frontend (Next.js 14+)
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# Step 1: Install Dependencies
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# Step 2: Build Application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Step 3: Production Runner
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
