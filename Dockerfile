FROM node:18

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

COPY . .

RUN pnpm run build:server

EXPOSE 5000
CMD [ "node", "server/dist/main.js" ]
