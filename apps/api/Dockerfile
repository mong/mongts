FROM node:20.14.0-alpine AS base

FROM base AS builder

WORKDIR /app

RUN yarn global add turbo@^2

COPY . .

RUN turbo prune api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
WORKDIR /app

# yarn > 1
RUN corepack enable

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN yarn install
 
# Build the project
COPY --from=builder /app/out/full/ .
RUN yarn turbo run build --filter=api...

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
COPY --from=installer /app/apps/api/build ./build
COPY --from=installer /app/node_modules ./node_modules
EXPOSE 80
ARG version="none"
ENV PORT=80
ENV VERSION=${version}
CMD ["node", "build"]
