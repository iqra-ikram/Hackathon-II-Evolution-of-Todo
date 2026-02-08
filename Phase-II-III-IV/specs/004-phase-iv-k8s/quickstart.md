# Quickstart: Phase IV Local Deployment

## Prerequisites

- Docker Desktop (with Docker AI/Gordon enabled)
- Minikube
- Helm
- kubectl
- kubectl-ai
- kagent

## Deployment Steps

1. **Start Minikube**
   ```bash
   minikube start --driver=docker
   minikube tunnel # (Run in separate terminal for LoadBalancer support)
   ```

2. **Build Images**
   ```bash
   # Point shell to Minikube's Docker daemon
   & minikube -p minikube docker-env --shell powershell | Invoke-Expression
   
   cd backend
   docker build -t todo-backend:v1 .
   cd ../frontend
   docker build -t todo-frontend:v1 .
   ```

3. **Deploy with Helm**
   ```bash
   cd k8s/helm/todo-app
   helm install todo-app . -f values-local.yaml
   ```

4. **Verify**
   ```bash
   kubectl get pods
   kubectl-ai "check if todo-app is healthy"
   ```

5. **Access**
   - Frontend: `http://localhost` (if using tunnel) or `minikube service todo-frontend --url`
