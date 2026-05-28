FROM node:24.16.0-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@11.1.3 --activate

FROM base AS builder

WORKDIR /app
ENV CI=true

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/api ./apps/api
COPY packages/types ./packages/types

RUN pnpm install --frozen-lockfile --filter api... \
    && pnpm --filter api build \
    && pnpm --filter api deploy --prod --legacy /prod/api

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /prod/api ./
EXPOSE 80
ARG version="none"
ENV PORT=80
ENV VERSION=${version}
CMD ["node", "build"]
