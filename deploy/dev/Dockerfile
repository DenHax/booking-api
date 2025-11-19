FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm ci

COPY . .

RUN npm install -g @nestjs/cli

RUN mkdir -p /app/logs

EXPOSE 3000

CMD ["npm", "run", "start"]
