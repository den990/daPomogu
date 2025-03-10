**Для запуска нужен minikube, kubernetes, docker**

- Запуск: minikube start (Причем надо указать что используем docker)
- Для проброса на локальную машину, в примере укажу на PoweShell нужно перебросить порты , вот следующай команда:<br><code>Start-Process -NoNewWindow -FilePath "kubectl" -ArgumentList "port-forward", "svc/user-service", "8080:80"</code>
- Полезные команды: <br>
  <code>kubectl get pods</code> - Просмотр активных подов и их состояние <br>
  <code>kubectl exec -it "название пода" -- sh     </code> - Подключиться к поду <br>
  <code>kubectl logs "Название пода"</code> - Просмотр логов пода <br>
  <code>kubectl rollout restart deployment "Название сервиса"</code> - Перезапуск пода <br>
  <code>kubectl apply -f "Назавание сервиса-deployment.yaml"</code> - Обновить/принять манифест деплоя