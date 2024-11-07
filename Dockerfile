FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./

RUN npm install

COPY ./src ./

EXPOSE 3000
CMD ["npm", "run", "start"]