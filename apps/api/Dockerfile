FROM node:22.22.0-alpine AS base

ENV NODE_ENV=production

FROM base AS builder

WORKDIR /app

COPY . .

RUN corepack enable && \
    yarn install && \
    yarn workspace api build && \
    yarn workspaces focus api --production

FROM base AS runner
WORKDIR /app

COPY --from=builder /app/apps/api/build ./build
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 80
ARG version="none"
ENV PORT=80
ENV VERSION=${version}
CMD ["node", "build"]
