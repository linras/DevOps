kubectl apply -f mypostgres/pv-local.yml

kubectl create -f myredis/myredis-service-clusterip.yml
kubectl create -f myredis/myredis-deployment.yml

kubectl apply -f mypostgres/postgres-pvc.yml
kubectl apply -f mypostgres/postgres-clusterip.yml
kubectl apply -f mypostgres/postgres-secret.yml
kubectl apply -f mypostgres/postgres-configMap.yml
kubectl apply -f mypostgres/postgres-deployment.yml

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.47.0/deploy/static/provider/cloud/deploy.yaml

kubectl create -f myapp-ingress.yml

kubectl apply -f my-backend-node-port.yml
kubectl apply -f my-backend-clusterip.yaml
kubectl apply -f my-backend-deploy.yml

kubectl create -f myfrontend-service-clusterip.yml
kubectl create -f myfrontend-deployment.yml

kubectl get deploy

# CLEANING:
kubectl delete services --all
kubectl delete configMaps --all
kubectl delete deployments --all
kubectl delete pods --all
kubectl delete ingresses --all
kubectl delete pvc --all
kubectl delete pv --all
kubectl delete secret --all


