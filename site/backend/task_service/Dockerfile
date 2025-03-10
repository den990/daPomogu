# Stage 1: Build
FROM golang:latest AS builder

WORKDIR /app

# Копируем зависимости и устанавливаем их
COPY go.mod go.sum ./
RUN go mod tidy

# Копируем исходный код
COPY . .

# Собираем приложение
RUN CGO_ENABLED=0 GOOS=linux go build -o main ./cmd

RUN wget -O migrate.tar.gz https://github.com/golang-migrate/migrate/releases/download/v4.14.1/migrate.linux-amd64.tar.gz && \
    tar -xzf migrate.tar.gz && \
    mv migrate.linux-amd64 migrate && \
    chmod +x migrate

# Stage 2: Run
FROM alpine:latest AS run

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем бинарник
COPY --from=builder /app/main .
COPY --from=builder /app/migrate .
COPY --from=builder /app/.env .env
COPY /migrations /app/migrations


COPY config.yaml ./config.yaml

# Разрешаем выполнение файла (на всякий случай)
RUN chmod +x ./main ./migrate

# Открываем порт
EXPOSE 8080

# Запускаем приложение
CMD ./migrate -path /app/migrations -database "postgresql://postgres:dapomogu_password@postgres-service:5432/dapomogu_task_db?sslmode=disable" up && ./main
