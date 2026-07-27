FROM node:24.18.0-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@11.1.3 --activate

FROM base AS builder

WORKDIR /app
ENV CI=true

COPY apps/api ./apps/api
COPY packages/types ./packages/types

RUN printf 'packages:\n  - "apps/api"\n  - "packages/types"\n' > pnpm-workspace.yaml

RUN pnpm install --filter api... \
    && pnpm --filter api build \
    && pnpm --filter api deploy --prod --legacy /prod/api \
    && cp -R apps/api/dist /prod/api/dist

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /prod/api ./
EXPOSE 80
ARG version="none"
ENV PORT=80
ENV VERSION=${version}
CMD ["node", "dist/index.js"]
