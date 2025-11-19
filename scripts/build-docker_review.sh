#!/usr/bin/env bash

set -e

GIT_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "unknown")
REPOSITORY_NAME="denhax/booking-api"
TAG=${1:-$GIT_TAG}
ENV_FILE=".env"

if [ "$TAG" == "unknown" ] || [ -z "$TAG" ]; then
  echo "Ошибка: Не удалось определить версию. Укажите версию явно или создайте git тег."
  echo "Использование: $0 [версия]"
  exit 1
fi

echo "Сборка Docker образа с версией: $TAG"

source ./.env

docker buildx build \
  --build-arg DATABASE_URL="$POSTGRES_URL" \
  --tag "$REPOSITORY_NAME:$TAG" \
  --file ./booking.Dockerfile .

echo "Docker образ успешно собран: $REPOSITORY_NAME:$TAG"
