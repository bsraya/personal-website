FROM oven/bun:alpine

WORKDIR /app

COPY . /app

RUN bun install
