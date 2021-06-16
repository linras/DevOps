FROM node:lts-alpine

WORKDIR /opt/myapp

COPY ./package.json ./

RUN yarn install

COPY ./ ./

CMD ["npm", "run", "start.dev"]