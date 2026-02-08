# Data Model: Phase IV Infrastructure

*Note: Phase IV is infrastructure-focused. No new application entities are introduced.*

## Infrastructure Entities

### Kubernetes Resources

- **Deployment**: `todo-frontend`, `todo-backend`
- **Service**: `todo-frontend` (LoadBalancer/NodePort), `todo-backend` (ClusterIP)
- **Secret**: `todo-secrets` (Database URL, API Keys)
- **ConfigMap**: `todo-config` (Non-sensitive env vars)
