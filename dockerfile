FROM node:latest

WORKDIR /app

COPY package*.json ./
COPY ./dist ./

RUN npm install


EXPOSE 3000

CMD ["sh", "-c", "NODE_ENV=production node ./main.js"]