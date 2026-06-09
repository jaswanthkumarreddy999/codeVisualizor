# Next.js Frontend — proxies /api/* to Spring Boot backend
FROM node:20-slim AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM node:20-slim AS builder
WORKDIR /app
# Force cache invalidation — bump this number to force a clean rebuild
ARG CACHE_BUST=2
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
# Copy everything needed to run next start
COPY --from=builder /app ./

EXPOSE 3000
# Render injects PORT env var — Next.js must bind to it
CMD ["sh", "-c", "npx next start -p ${PORT:-3000}"]
