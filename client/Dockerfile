# Next.js Frontend — proxies /api/* to Spring Boot backend
# Build version: 3 — force clean rebuild
FROM node:20-slim AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM node:20-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app ./

EXPOSE 3000
CMD ["sh", "-c", "npx next start -p ${PORT:-3000}"]
