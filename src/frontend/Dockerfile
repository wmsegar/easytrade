# Node version needs to be set to 18.12 at most due to problems in tests
# that happen in higher versions
# Github issue: https://github.com/remix-run/react-router/issues/10158
# https://github.com/remix-run/react-router/issues/10118#issuecomment-1437406461

FROM node:18.18.2-bullseye as build

WORKDIR /app

COPY [".", "."]

RUN yarn install \
    # && yarn run build-test \
    && yarn run build

FROM node:18.18.2-bullseye-slim as serve

WORKDIR /app

COPY --from=build ["/app/dist", "./dist"]
COPY --from=build ["/app/.env*", "/app/yarn.lock", "/app/vite.config.ts", "/app/env.ts", "./"]

RUN yarn add vite @vitejs/plugin-react-swc @julr/vite-plugin-validate-env \
    && yarn cache clean \
    && echo '{ "type": "module" }' > package.json

CMD ["yarn", "vite", "preview", "--port", "3000", "--host"]
