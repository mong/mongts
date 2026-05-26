FROM node:24.16.0-alpine AS base

ENV NODE_ENV=production

FROM base AS builder

WORKDIR /app

COPY . .

# Migrate to pnpm, remove lines that are commented out when it works !
# RUN corepack enable && \
#     yarn install && \
#     yarn workspace api build && \
#     yarn workspaces focus api --production
RUN pnpm install \
    && pnpm install \
    && pnpm --filter api build \
    && pnpm --filter api --prod

FROM base AS runner
WORKDIR /app

COPY --from=builder /app/apps/api/build ./build
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 80
ARG version="none"
ENV PORT=80
ENV VERSION=${version}
CMD ["node", "build"]
