FROM node:lts-alpine

RUN apk update

WORKDIR /opt/myapp

COPY ./package.json ./

COPY ./ ./

CMD ["npm", "start"]