FROM oven/bun:1-alpine AS builder

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install

COPY . .

RUN bun run build

RUN bun run compile

FROM oven/bun:1-alpine AS runner

WORKDIR /app

COPY --from=builder /app/server server

EXPOSE 4001

CMD ["./server"]