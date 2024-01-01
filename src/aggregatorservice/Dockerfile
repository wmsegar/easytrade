FROM node:16 as builder

WORKDIR /app

COPY *.json ./
COPY ./src ./src

RUN npm ci \
    && npm run build

FROM node:16-bullseye-slim as dev

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev \
    && npm cache clean --force

COPY --from=builder /app/dist ./dist

EXPOSE 8080

CMD [ "npm", "run", "start" ]
