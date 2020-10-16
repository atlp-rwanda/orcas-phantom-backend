FROM node:latest

WORKDIR /var/phantom-backend

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]