FROM node:24.16.0-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@11.1.3 --activate

FROM base AS builder

WORKDIR /app
ENV CI=true

COPY . ./

RUN --mount=type=secret,id=NODE_AUTH_TOKEN \
    NODE_AUTH_TOKEN="$(cat /run/secrets/NODE_AUTH_TOKEN)" \
    && export NODE_AUTH_TOKEN \
    && pnpm install --frozen-lockfile \
    && pnpm --filter api build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/apps/api/build ./build
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 80
ARG version="none"
ENV PORT=80
ENV VERSION=${version}
CMD ["node", "build"]
