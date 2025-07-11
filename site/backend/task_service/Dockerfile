FROM golang:alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
# Устанавливаем зависимости
RUN go mod tidy

# Копируем остальные файлы проекта
COPY . .


RUN CGO_ENABLED=0 GOOS=linux go build -o main ./task_service/cmd

RUN wget -O migrate.tar.gz https://github.com/golang-migrate/migrate/releases/download/v4.14.1/migrate.linux-amd64.tar.gz && \
    tar -xzf migrate.tar.gz && \
    mv migrate.linux-amd64 migrate && \
    chmod +x migrate

FROM alpine:latest

WORKDIR /app/

COPY --from=builder /app/main .
COPY --from=builder /app/migrate .
COPY task_service/.env /app/.env
COPY task_service/config.yaml /app/config.yaml
COPY task_service/migrations /app/migrations
COPY task_service/no-avatar.jpg /app/uploads/user/no-avatar.jpg

# Разрешаем выполнение файлов
RUN chmod +x ./main ./migrate

EXPOSE 8080

ENV PORT=50501
CMD sh -c "./migrate -path /app/migrations -database 'postgresql://postgres:dapomogu_password@postgres-service:5432/dapomogu_task_db?sslmode=disable' up && ./main --config=./config.yaml"

