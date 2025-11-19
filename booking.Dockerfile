FROM node:24-alpine AS development
WORKDIR /usr/src/app
RUN apk add --no-cache \
  openssl \
  openssl-dev \
  libc6-compat
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
COPY package*.json ./
RUN npm ci
COPY . .
COPY prisma ./prisma
RUN npx prisma generate
USER node

# Build stage
FROM node:24-alpine AS build
WORKDIR /usr/src/app
RUN apk add --no-cache \
  openssl \
  openssl-dev \
  libc6-compat
COPY package*.json ./
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
COPY prisma ./prisma
RUN npx prisma generate
RUN npm run build
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force
USER node

# Production stage
FROM node:24-alpine AS production
WORKDIR /usr/src/app

RUN apk add --no-cache \
  openssl \
  openssl-dev \
  libc6-compat

COPY --from=build /usr/src/app/package.json ./
COPY --from=build /usr/src/app/prisma ./prisma

COPY --from=build /usr/src/app/node_modules ./node_modules

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/generated ./generated

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main"]
