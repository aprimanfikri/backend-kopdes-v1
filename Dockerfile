# === Builder Stage ===
FROM oven/bun:1-alpine AS builder
WORKDIR /app

# Install dependencies first (better cache layer)
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Use build args for Prisma
ARG DATABASE_URL
ARG NODE_ENV=production
ENV DATABASE_URL=$DATABASE_URL
ENV NODE_ENV=$NODE_ENV

# Generate Prisma client
RUN bunx prisma generate

# Build application
RUN bun run build

# === Runner Stage ===
FROM oven/bun:1-alpine AS runner
WORKDIR /app

# Install runtime dependencies only
RUN apk add --no-cache curl

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S bunuser -u 1001

# Copy necessary files from builder
COPY --from=builder --chown=bunuser:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=bunuser:nodejs /app/dist ./dist
COPY --from=builder --chown=bunuser:nodejs /app/package.json ./
COPY --from=builder --chown=bunuser:nodejs /app/prisma ./prisma

# Switch to non-root user
USER bunuser

# Health check (pastikan endpoint /health ada di aplikasi Anda)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:4001/health || exit 1

# Expose port
EXPOSE 4001

# Start application
CMD ["bun", "run", "start"]