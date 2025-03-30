FROM nginx:alpine

# Копируем собранные файлы в директорию Nginx для статики
COPY build /usr/share/nginx/html

# Открываем порт 80 для сервера
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
