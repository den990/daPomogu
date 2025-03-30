# Этап сборки (build)
FROM node:22 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Этап продакшена с Nginx
FROM nginx:latest

# Копируем скомпилированные файлы в Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Копируем кастомный конфиг Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
