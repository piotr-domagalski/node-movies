FROM node:current-alpine
WORKDIR /usr/app

COPY ./package.json ./
ENV NPM_CONFIG_LOGLEVEL=info
RUN ["npm", "install", "typescript", "@types/node"]

COPY ./src ./src
COPY ./tsconfig.json ./
RUN ["npx", "tsc"]

ENTRYPOINT ["node", "dist/main.js"]
