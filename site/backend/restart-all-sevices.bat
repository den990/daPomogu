@echo off
echo Удаление старых ресурсов...
kubectl delete deployment postgres
kubectl delete service postgres-service
kubectl delete configmap postgres-init-script
kubectl delete service user-service
kubectl delete deployment user-service
kubectl delete service task-service
kubectl delete deployment task-service
kubectl delete service chat-service
kubectl delete deployment chat-service
kubectl delete service notification-service
kubectl delete deployment notification-service


echo Применение новых конфигураций...
kubectl apply -f postgres-pv.yaml
kubectl apply -f postgres-pvc.yaml
kubectl apply -f postgres-init-configmap.yaml
kubectl apply -f postgres-service.yaml
kubectl apply -f postgres_service-deployment.yaml
kubectl apply -f user_service-deployment.yaml
kubectl apply -f task_service-deployment.yaml
kubectl apply -f chat_service-deployment.yaml
kubectl apply -f notification_service-deployment.yaml

echo Готово!
pause
