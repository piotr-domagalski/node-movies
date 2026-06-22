FROM node:current-alpine
WORKDIR /usr/app

COPY ./package.json ./
ENV NPM_CONFIG_LOGLEVEL=info

# ts
# TODO: which of these are dev?
RUN ["npm", "install", "typescript", "@types/node"]
RUN ["npm", "install", "prisma", "--save-dev"]
RUN ["npm", "install", "@prisma/client", "@prisma/adapter-mariadb", "dotenv"]
RUN ["npm", "install", "@t3-oss/env-nuxt", "zod"]
RUN ["npm", "install", "express", "@types/express"]
RUN ["npm", "install", "ejs"]

# prisma
# TODO: which order? prisma first or sources first
COPY ./prisma ./prisma
RUN ["npx", "prisma", "generate"]
COPY ./prisma.config.ts ./prisma.config.ts

COPY ./tsconfig.json ./
COPY ./src ./src
# compile
RUN ["npx", "tsc"]
COPY ./src/views ./dist/views

WORKDIR /usr/app/dist
ENTRYPOINT ["node", "main.js"]
