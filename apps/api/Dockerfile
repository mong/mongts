FROM node:20.0.0-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install --only=production && yarn cache clean
COPY build ./build
EXPOSE 80
ARG version="none"
ENV NODE_ENV=production
ENV PORT=80
ENV VERSION=${version}
CMD ["node", "build"]
