FROM node:16.13.0-alpine3.14

WORKDIR /opt/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY bin/ ./bin
COPY public/ ./public
COPY routes/ ./routes
COPY services/ ./services
COPY app.js .

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

EXPOSE 3000

CMD npm start
