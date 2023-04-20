FROM node:18

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /capi-mutlisig-app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml /capi-mutlisig-app/
COPY www/package.json /capi-mutlisig-app/www/package.json
COPY server/package.json /capi-mutlisig-app/server/package.json
COPY common/package.json /capi-mutlisig-app/common/package.json

RUN pnpm install

COPY . /capi-mutlisig-app/

RUN pnpm run build:server

EXPOSE 5000
CMD [ "node", "server/dist/main.js" ]
