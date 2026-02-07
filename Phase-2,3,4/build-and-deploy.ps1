# build-and-deploy.ps1
Write-Host "Starting Local Build & Deploy..." -ForegroundColor Cyan

# 1. Point Docker to Minikube
Write-Host "Configuring Docker environment for Minikube..." -ForegroundColor Yellow
& minikube -p minikube docker-env --shell powershell | Invoke-Expression

# 2. Build Backend
Write-Host "Building Backend Image (todo-backend:v1)..." -ForegroundColor Yellow
docker build -t todo-backend:v1 ./backend

# 3. Build Frontend
Write-Host "Building Frontend Image (todo-frontend:v1)..." -ForegroundColor Yellow
docker build -t todo-frontend:v1 ./frontend

# 4. Deploy with Helm
Write-Host "Deploying with Helm..." -ForegroundColor Yellow
# Update dependencies if needed
# helm dependency update ./k8s/helm/todo-app

# Upgrade or Install
helm upgrade --install todo-app ./k8s/helm/todo-app -f ./k8s/helm/values-local.yaml

Write-Host "Done! Check status with: kubectl get pods" -ForegroundColor Green