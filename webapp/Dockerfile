FROM node:lts-alpine

RUN apk update

WORKDIR /opt/myapp

COPY ./package.json ./

#RUN npm install -g npm@latest

COPY ./ ./

CMD ["npm", "start"]