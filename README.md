# Система бронирования мест. NestJS

Задание описано в (TASK.md)[./TASK.md]

## Вопросы по заданию и их решение:

Проблема 1: Не было ничего сказано про используемые технологии

Решение: Для реализации API были выбраны NestJS как web-framework и Postgres как база данных, Prisma как ORM

Проблема 2: Не было сказано про необходимость реализации авторизации, при этом в теле запроса к API есть `user_id`, что наводит на мысль об отсутствии авторизации в рамках данного задания

Решение: Не реализовывать авторизацию в данный момент

## Getting started

Запуск происходит в Docker, оркестрация через Compose
Конфигурирование через .env

```sh
git clone https://github.com/DenHax/booking-api.git
cp .env.dist .env
docker compose up --force-recreate

```

Образ запакованного приложения расположен в DockerHub. Образ можно собрать вручную с помощью `Make` и файла в `scripts/`

```sh
make docker
```

Будет собран образ `denhax/booking-api:v1.1`, актуальной версии тэга `git`

Есть окружение для разработки в `deploy/dev`

## Стэк

- Nest JS - web-framework
- Prisma - ORM
- Postgres - Database
- Docker, Compose - containerization and orchestration
- Makefile - build image
- Git - version control
- Github, Dockerhub - code/image repository
- Nix - developement environment
