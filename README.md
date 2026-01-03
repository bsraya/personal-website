# Personal Website

1. Install required dependencies
```bash
bun install
```

2. Run the project
```bash
bunx -- bun astro dev
```

3. Rebuild the Docker image

```bash
docker compose down && \
    docker image rm johnbjohn/personal-website:latest && \
    docker build -t johnbjohn/personal-website:latest . && \
    docker compose up -d
```