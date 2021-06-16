FROM node:lts-alpine

#RUN apk update

WORKDIR /opt/myapp

COPY ./package.json ./

RUN yarn install

COPY ./ ./

CMD ["npm", "run", "start"]