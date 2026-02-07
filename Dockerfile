
# Use Node.js 20 as base
FROM node:20-slim AS base

# Install dependencies needed for compilation (Java, C++, etc.)
RUN apt-get update && apt-get install -y \
    openjdk-17-jdk \
    build-essential \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source
COPY . .

# Compile Tracer.java (Java 17) with JDI module added
RUN javac --add-modules jdk.jdi lib/java/Tracer.java


# Build Next.js app
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
