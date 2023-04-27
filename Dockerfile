FROM node:18

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /capi-multisig-app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml /capi-multisig-app/
COPY www/package.json /capi-multisig-app/www/package.json
COPY server/package.json /capi-multisig-app/server/package.json
COPY common/package.json /capi-multisig-app/common/package.json

RUN pnpm install

COPY . /capi-multisig-app/

RUN pnpm run build:server

EXPOSE 5000
CMD [ "node", "server/dist/main.js" ]
