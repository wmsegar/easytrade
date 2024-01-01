FROM node:16 as builder

WORKDIR /usr/src/app

RUN apt-get update \
    && rm -rf /var/lib/apt/lists/*

COPY *.json ./
COPY ./resources ./resources
COPY ./src ./src

RUN npm ci
RUN npm run build

FROM node:16-bullseye-slim as dev

WORKDIR /usr/src/app

RUN apt-get update \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /usr/src/app/dist ./dist
COPY ./resources ./resources

EXPOSE 8080

CMD [ "npm","run","start" ]
