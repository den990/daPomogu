# Используем Node.js для создания и запуска приложения
FROM node:16 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код
COPY . .

# Строим приложение
RUN npm run build

# Используем образ с Node.js для запуска статических файлов
FROM node:16

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем скомпилированные файлы из предыдущего этапа
COPY --from=build /app/build /app

# Устанавливаем простой HTTP сервер для обслуживания файлов
RUN npm install -g serve

# Открываем порт 5000 для веб-сервера
EXPOSE 5000

# Запускаем сервер
CMD ["serve", "-s", "build", "-l", "5000"]
