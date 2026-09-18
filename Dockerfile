# Build content, client and server; run the Fastify server serving the PWA.
FROM node:20-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
COPY shared/package.json shared/
COPY data/package.json data/
COPY client/package.json client/
COPY server/package.json server/
RUN npm ci
COPY . .
RUN npm run data:fetch && npm run build

FROM node:20-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production PORT=8787 DB_PATH=/data/nihongo.db
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/shared ./shared
COPY --from=build /app/server/package.json ./server/
COPY --from=build /app/server/dist ./server/dist
COPY --from=build /app/client/dist ./client/dist
COPY --from=build /app/data/package.json ./data/
COPY --from=build /app/client/package.json ./client/
RUN npm ci --omit=dev -w server -w shared
VOLUME ["/data"]
EXPOSE 8787
CMD ["node", "server/dist/index.js"]
