# Next.js Frontend — proxies /api/* to Spring Boot backend
FROM node:20-slim AS base

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source
COPY . .

# Build Next.js app — cache bust via build arg
ARG CACHEBUST=1
RUN npm run build

EXPOSE 3000

# Render injects PORT env var — Next.js must bind to it
CMD ["sh", "-c", "npx next start -p ${PORT:-3000}"]
