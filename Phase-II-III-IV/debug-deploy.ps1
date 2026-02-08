$ErrorActionPreference = "Continue"

Start-Transcript -Path "deploy_log.txt" -Force

Write-Host "--- CHECKING TOOLS ---"
helm version
kubectl version --client
docker version

Write-Host "--- CONFIGURING DOCKER ---"
& minikube -p minikube docker-env --shell powershell | Invoke-Expression
docker info

Write-Host "--- BUILDING BACKEND ---"
docker build -t todo-backend:v1 ./backend

Write-Host "--- BUILDING FRONTEND ---"
docker build -t todo-frontend:v1 ./frontend

Write-Host "--- DEPLOYING HELM ---"
# Using backslashes for path safety
helm upgrade --install todo-app .\k8s\helm\todo-app -f .\k8s\helm\values-local.yaml --debug

Stop-Transcript
