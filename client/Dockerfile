# Next.js Frontend — proxies /api/* to Spring Boot backend
FROM node:20-slim AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM node:20-slim AS builder
WORKDIR /app
# Copy installed deps from previous stage
COPY --from=deps /app/node_modules ./node_modules
# Copy source (no .next, no node_modules — see .dockerignore)
COPY . .
# Always do a fresh build — no stale .next cache possible
RUN npm run build

FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
# Copy everything needed to run next start
COPY --from=builder /app ./

EXPOSE 3000
# Render injects PORT env var — Next.js must bind to it
CMD ["sh", "-c", "npx next start -p ${PORT:-3000}"]
