# === Builder Stage ===
FROM oven/bun:1 AS builder
WORKDIR /app

# Install dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Generate Prisma client
RUN bun run db:generate

# Build your application
RUN bun run build

# === Runner Stage ===
FROM oven/bun:1 AS runner
WORKDIR /app

# Copy only necessary build output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./

# Expose port
EXPOSE 4001

# Start application
CMD ["bun", "run", "start"]
