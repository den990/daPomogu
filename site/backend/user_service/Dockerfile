FROM golang:1.23-alpine as builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем go.mod и go.sum для установки зависимостей
COPY go.mod go.sum ./

# Копируем .env файл
COPY .env .env

# Копируем остальные файлы проекта
COPY . .

# Устанавливаем зависимости
RUN go mod tidy

# Собираем приложение
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

FROM alpine:latest

# Устанавливаем необходимые библиотеки для работы с PostgreSQL
RUN apk --no-cache add ca-certificates

# Устанавливаем рабочую директорию
WORKDIR /root/

# Копируем скомпилированный бинарник из стадии сборки
COPY --from=builder /app/main .

# Копируем .env файл в финальный образ
COPY --from=builder /app/.env .env

# Открываем порт
EXPOSE 8080

# Команда для запуска приложения
CMD ["./main"]
