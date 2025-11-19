# Система бронирования мест. NestJS

Задание описано в (TASK.md)[./TASK.md]

## Вопросы по заданию и их решение:

Проблема 1: Не было ничего сказано про используемые технологии

Решение: Для реализации API были выбраны NestJS как web-framework и Postgres как база данных, Prisma как ORM

Проблема 2: Не было сказано про необходимость реализации авторизации, при этом в теле запроса к API есть `user_id`, что наводит на мысль об отсутствии авторизации в рамках данного задания

Решение: Не реализовывать авторизацию в данный момент

## API

API разработанного приложения можно протестировать после запуска через Swagger. Он доступен по адресу [http://localhost:3000/api]

Само API запущено по пути [http://localhost:3000/api], содержит эндпоинты:

`api/bookings`

`api/users`

`api/events`

### Пример работы

Дано: тестовый вариант из задачи. ID пользователя генерируется автоматически, пользователь и событие были созданы через `POST api/users` и `POST api/events`

`POST http://localhost:3000/api/bookings/reserve`

```json
{
  "event_id": 1,
  "user_id": "cmi6hesem0000k201auy1p6ol"
}
```

Полученный ответ от API

```json
{
  "id": 1,
  "eventId": 1,
  "userId": "cmi6hesem0000k201auy1p6ol",
  "createdAt": "2025-11-19T20:56:25.756Z"
}
```

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
