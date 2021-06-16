FROM node:lts-alpine

#RUN apk update

WORKDIR /opt/myapp

COPY ./package.json ./

#RUN npm install -g npm@latest
RUN yarn install

COPY ./ ./

#CMD ["npm", "start"]
#CMD ["nodemon", "-L", "index.js"]
CMD ["npm", "run", "start"]