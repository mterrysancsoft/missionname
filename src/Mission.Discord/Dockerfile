FROM node:8.15.0-jessie

WORKDIR /usr/src/bot

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
