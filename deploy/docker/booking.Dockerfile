FROM node:24.11-alpine AS development
WORKDIR /var/booking
COPY package*.json ./
# RUN npm ci
RUN npm ci --loglevel verbose --fetch-retries=5 --fetch-timeout=600000
COPY . .
USER node

FROM node:24.11-alpine AS build
WORKDIR /var/booking
COPY package*.json ./
COPY --from=development /var/booking/node_modules ./node_modules
COPY . .
RUN npm run build
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force
USER node

FROM node:24.11-alpine AS production
WORKDIR /var/booking
COPY --from=build /var/booking/node_modules ./node_modules
COPY --from=build /var/booking/dist ./dist
CMD ["node", "dist/main.js"]
