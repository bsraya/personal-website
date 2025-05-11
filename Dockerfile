FROM oven/bun:alpine AS builder
WORKDIR /app
COPY . /app
RUN bun install --frozen-lockfile --production

FROM oven/bun:alpine AS production
WORKDIR /app
COPY --from=builder /app /app