# Используем официальный Node.js образ для сборки
FROM node:16 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в контейнер
COPY . .

# Сборка React-приложения для продакшн
RUN npm run build

# Используем более легкий образ для запуска приложения
FROM nginx:alpine

# Копируем сборку из предыдущего этапа в директорию, используемую Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Открываем порт для Nginx
EXPOSE 80

# Запускаем Nginx сервер
CMD ["nginx", "-g", "daemon off;"]
