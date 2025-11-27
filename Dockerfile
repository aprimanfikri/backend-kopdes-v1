# === Builder Stage ===
FROM oven/bun:1-alpine AS builder
WORKDIR /app

# Install dependencies first (better cache layer)
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# Copy source code and generate Prisma client
COPY . .
RUN bunx prisma generate

# Build application
RUN bun run build

# === Runner Stage ===
FROM oven/bun:1-alpine AS runner
WORKDIR /app

# Install runtime dependencies
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

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:4001/health || exit 1

# Expose port
EXPOSE 4001

# Start application with optimized flags
CMD ["bun", "run", "start"]