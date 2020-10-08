FROM node:alpine

WORKDIR /var/phantom

COPY ./package.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]