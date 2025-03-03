# Используем официальный образ Go
FROM golang:1.23-alpine as builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем go.mod и go.sum, чтобы установить зависимости
COPY go.mod go.sum ./

# Устанавливаем зависимости
RUN go mod tidy

# Копируем все файлы приложения в контейнер
COPY . .

# Собираем приложение
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# Финальный образ
FROM alpine:latest

# Устанавливаем необходимые библиотеки для работы с PostgreSQL
RUN apk --no-cache add ca-certificates

# Устанавливаем рабочую директорию
WORKDIR /root/

# Копируем скомпилированный бинарник из стадии сборки
COPY --from=builder /app/main .

# Открываем порт
EXPOSE 8080

# Команда для запуска приложения
CMD ["./main"]
