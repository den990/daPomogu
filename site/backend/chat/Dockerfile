FROM golang:1.23-alpine as builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем go.mod и go.sum для установки зависимостей
COPY go.mod go.sum ./

# Устанавливаем зависимости
RUN go mod tidy

# Копируем остальные файлы проекта
COPY . .

# Собираем приложение
RUN CGO_ENABLED=0 GOOS=linux go build -o main ./chat/cmd

# Загружаем и устанавливаем migrate
RUN wget -O migrate.tar.gz https://github.com/golang-migrate/migrate/releases/download/v4.14.1/migrate.linux-amd64.tar.gz && \
    tar -xzf migrate.tar.gz && \
    mv migrate.linux-amd64 migrate && \
    chmod +x migrate

# Финальный образ
FROM alpine:latest

# Устанавливаем необходимые библиотеки для работы с PostgreSQL
RUN apk --no-cache add ca-certificates

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем бинарники из стадии сборки
COPY --from=builder /app/main .
COPY --from=builder /app/migrate .
COPY chat/.env /app/.env
COPY chat/migrations /app/migrations
COPY chat/config.yaml /app/config.yaml
# Разрешаем выполнение файлов
RUN chmod +x ./main ./migrate

# Открываем порт
EXPOSE 8080

# Запускаем миграции перед запуском приложения
CMD sh -c "./migrate -path /app/migrations -database 'postgresql://postgres:dapomogu_password@postgres-service:5432/dapomogu_chat_db?sslmode=disable' up && ./main --config=./config.yaml"
