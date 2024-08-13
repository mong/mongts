FROM node:20.14.0-alpine AS base

FROM base AS builder

WORKDIR /app

RUN yarn global add turbo@^2

COPY . .

RUN turbo prune api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
WORKDIR /app
 
# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN yarn install
 
# Build the project
COPY --from=builder /app/out/full/ .
RUN yarn turbo run build --filter=api...
 
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
COPY --from=installer /app/api/build ./build
EXPOSE 80
ARG version="none"
ENV PORT=80
ENV VERSION=${version}
CMD ["node", "build"]
