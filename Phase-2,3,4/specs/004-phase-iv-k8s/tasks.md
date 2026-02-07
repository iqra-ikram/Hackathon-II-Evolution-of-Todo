# Tasks: Phase IV: Local Kubernetes Deployment

**Branch**: `004-phase-iv-k8s` | **Spec**: [specs/004-phase-iv-k8s/spec.md](spec.md) | **Plan**: [specs/004-phase-iv-k8s/plan.md](plan.md)

## Implementation Phases

### Phase 1: Setup
**Goal**: Initialize project structure for infrastructure components.

- [x] T001 Create k8s directory structure for Helm charts in k8s/helm/todo-app
- [x] T002 Create subcharts directory in k8s/helm/todo-app/charts
- [x] T003 Create .dockerignore file for Backend in backend/.dockerignore
- [x] T004 Create .dockerignore file for Frontend in frontend/.dockerignore

### Phase 2: Foundational (Prerequisites)
**Goal**: Ensure local environment is ready for deployment.

- [x] T005 Verify Minikube installation and start cluster with Docker driver
- [x] T006 Verify Helm installation and initialize local repository if needed
- [x] T007 Verify Docker AI (Gordon) availability via docker ai command
- [ ] T008 Verify kubectl-ai and kagent availability

### Phase 3: Containerize Application Stack (User Story 1)
**Goal**: Build optimized Docker images for Frontend and Backend.
**Independent Test**: `docker run` successfully starts containers; endpoints accessible.

**Backend Containerization**
- [x] T009 [US1] Generate Backend Dockerfile using Docker AI (Gordon) in backend/Dockerfile
- [x] T010 [US1] Optimize Backend Dockerfile for multi-stage build (builder/runner) in backend/Dockerfile
- [x] T011 [US1] Build Backend Docker image locally (todo-backend:v1)
- [ ] T012 [US1] Verify Backend container runs locally on port 8000

**Frontend Containerization**
- [x] T013 [US1] Generate Frontend Dockerfile using Docker AI (Gordon) in frontend/Dockerfile
- [x] T014 [US1] Optimize Frontend Dockerfile for multi-stage build (builder/runner) in frontend/Dockerfile
- [x] T015 [US1] Build Frontend Docker image locally (todo-frontend:v1)
- [ ] T016 [US1] Verify Frontend container runs locally on port 3000

### Phase 4: Deploy to Local Minikube Cluster (User Story 2)
**Goal**: Deploy applications using Helm Charts.
**Independent Test**: `helm install` succeeds; Pods reach `Running` state; App accessible via Minikube IP.

**Helm Chart Development**
- [x] T017 [US2] Create Chart.yaml for main umbrella chart in k8s/helm/todo-app/Chart.yaml
- [x] T018 [US2] Create values.yaml with default configuration in k8s/helm/todo-app/values.yaml
- [x] T019 [US2] Create values-local.yaml for local overrides (imagePullPolicy: Never) in k8s/helm/values-local.yaml
- [x] T020 [US2] Create Backend Deployment manifest template in k8s/helm/todo-app/templates/backend-deployment.yaml
- [x] T021 [US2] Create Backend Service manifest template in k8s/helm/todo-app/templates/backend-service.yaml
- [x] T022 [US2] Create Frontend Deployment manifest template in k8s/helm/todo-app/templates/frontend-deployment.yaml
- [x] T023 [US2] Create Frontend Service manifest template (NodePort/LoadBalancer) in k8s/helm/todo-app/templates/frontend-service.yaml
- [x] T024 [US2] Create Secret manifest for DB credentials in k8s/helm/todo-app/templates/secrets.yaml

**Deployment & Verification**
- [x] T025 [US2] Load local Docker images into Minikube cache (minikube image load)
- [x] T026 [US2] Install Helm chart to Minikube using values-local.yaml
- [x] T027 [US2] Verify all Pods are in Running state
- [x] T028 [US2] Verify Frontend is accessible via minikube service url or tunnel

### Phase 5: AI-Assisted Operations (User Story 3)
**Goal**: Validate operational workflows using AI tools.
**Independent Test**: Successful execution of `kubectl-ai` and `kagent` commands.

- [ ] T029 [US3] Scale Backend deployment using kubectl-ai "scale backend to 3 replicas"
- [ ] T030 [US3] Analyze cluster health using kagent "analyze cluster health"
- [ ] T031 [US3] Verify self-healing by deleting a Pod and observing recreation

### Phase 6: Polish
**Goal**: Finalize documentation and configuration.

- [ ] T032 Update project README.md with Phase IV deployment instructions
- [ ] T033 Document common kubectl-ai prompts in specs/004-phase-iv-k8s/quickstart.md
- [ ] T034 Review and clean up temporary K8s resources

## Dependencies

1. **Setup** (T001-T004) -> **Foundational** (T005-T008)
2. **Foundational** -> **User Story 1** (T009-T016)
3. **User Story 1** -> **User Story 2** (T017-T028)
4. **User Story 2** -> **User Story 3** (T029-T031)

## Parallel Execution Opportunities

- **Phase 3**: Backend (T009-T012) and Frontend (T013-T016) containerization can proceed in parallel.
- **Phase 4**: Backend (T020-T021) and Frontend (T022-T023) Helm templates can be developed in parallel.

## Implementation Strategy

1. **Container First**: Focus strictly on getting valid Docker builds for both apps. Use `docker run` to verify they work in isolation before introducing K8s complexity.
2. **Declarative Base**: Build the Helm chart incrementally. Start with one service (e.g., Backend), deploy, verify, then add the next.
3. **Local Loop**: Use `values-local.yaml` to override `imagePullPolicy` to `Never` or `IfNotPresent` to ensure Minikube uses the locally built images, avoiding registry complexity for now.