# Используем Node.js для создания и запуска приложения
FROM node:22 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package.json ./

# Устанавливаем зависимости с флагом --legacy-peer-deps
RUN npm install --legacy-peer-deps

# Копируем весь код
COPY . .

# Строим приложение
RUN npm run build

# Используем образ с Node.js для запуска статических файлов
FROM node:22

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем скомпилированные файлы из предыдущего этапа
COPY --from=build /app/build /app

# Устанавливаем простой HTTP сервер для обслуживания файлов
RUN npm install -g serve

# Открываем порт 5000 для веб-сервера
EXPOSE 80

# Запускаем сервер
CMD ["serve", "-s", "build", "-l", "80"]
