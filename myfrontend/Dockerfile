FROM node:lts-alpine

WORKDIR /opt/app

COPY ./package.json ./

RUN yarn install

COPY ./ ./

CMD ["npm", "start"]
