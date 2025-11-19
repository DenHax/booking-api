FROM node:24-alpine AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
COPY prisma ./prisma
RUN npx prisma generate
USER node

# Build stage
FROM node:24-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY . .
COPY prisma ./prisma
RUN npx prisma generate
RUN npm run build
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force
USER node

# Production stage
FROM node:24-alpine AS production
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package.json /usr/src/app/prisma ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
# CMD ["node", "dist/src/main.js"]
CMD ["npm", "run", "migrate:start:prod"]
