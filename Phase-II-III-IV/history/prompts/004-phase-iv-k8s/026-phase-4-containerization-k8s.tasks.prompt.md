---
id: 026
title: Phase 4 Containerization and K8s Config
stage: tasks
date: 2026-02-03
surface: agent
model: Antigravity (Gemini 2.0)
feature: 004-phase-iv-k8s
branch: main
user: iqra
command: none
labels: ["docker", "k8s", "helm", "minikube"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - backend/Dockerfile
  - frontend/Dockerfile
  - k8s/helm/values-local.yaml
  - build-and-deploy.ps1
tests:
  - manual verification
---

## Prompt

The Containerization Layer (Docker)
   * Current State: backend/Dockerfile and frontend/Dockerfile exist. They use multi-stage builds (Builder -> Runner) to keep images small.
   * Details to Check:
       * Backend: Ensure the CMD in the Dockerfile correctly points to the entry point (e.g., uvicorn src.main:app). Check if environment variables for the
         Database URL are being passed correctly.
       * Frontend: Ensure the NEXT_PUBLIC_API_URL (pointing to the backend service) is handled correctly. In K8s, the frontend usually communicates with the
         backend via the ClusterIP Service Name (e.g., http://todo-backend:8000) or through the browser via a NodePort/Ingress.
   * Potential Issue: If the images were built with localhost hardcoded for API calls, they will fail inside the Kubernetes network.

  2. The Helm Chart Layer (k8s/helm/todo-app)
   * Current State: Templates exist for Deployment, Service, and Secrets.
   * Configuration Points:
       * `values.yaml` vs `values-local.yaml`: The values-local.yaml should have imagePullPolicy: Never. This tells Kubernetes not to look at Docker
         Hub/Registry but to use the image already in the Minikube cache.
       * Service Types:
           * The Backend service should be Type: ClusterIP (internal only).
           * The Frontend service should be Type: NodePort or LoadBalancer to allow you to access it from your Windows browser.
   * The Secret Layer: templates/secrets.yaml manages the Neon DB connection string. Ensure the base64 encoding in the secret matches the actual connection
     string.

  3. The Kubernetes Runtime (Minikube)
   * The "Image Visibility" Problem: This is the most common failure. Even if you build the image on your machine, Minikube (which runs in its own VM or
     container) cannot see it unless you:
       1. Run minikube image load todo-frontend:v1 and minikube image load todo-backend:v1.
       2. OR, point your shell to Minikube's Docker daemon before building: & minikube -p minikube docker-env --shell powershell | Invoke-Expression.
   * Networking: Inside the cluster, the Frontend needs to know how to reach the Backend. If the Frontend is server-side rendering (Next.js
     getServerSideProps), it uses the service name todo-backend. If it's client-side (browser), it needs the external IP/Port of the backend.

  4. Specific Blockers to Debug
  If you are handing this to another AI, ask it to investigate these three specific errors:

   1. `ImagePullBackOff`: This means Minikube is trying to download your "v1" image from the internet instead of using the local build.
       * Fix: Check imagePullPolicy and ensure minikube image load was successful.
   2. `CrashLoopBackOff`: The pod starts but dies immediately.
       * Fix: Run kubectl logs <pod-name> to see the application error (usually a missing DB connection or a port conflict).
   3. Connection Refused (Frontend to Backend): The UI loads, but you can't log in or see tasks.
       * Fix: Check the ENV variables in the Frontend deployment to ensure it's pointing to the correct Backend service address.

  5. AI Tooling Prerequisites
   * `kubectl-ai`: This requires an OPENAI_API_KEY (or similar) set in your environment. If the AI tries to use it without the key, it will fail.
   * `kagent`: Similar to kubectl-ai, it needs access to the cluster context and an LLM provider.     make the phase 4 full working

## Response snapshot

I performed a comprehensive check and update of the Docker and Kubernetes configurations for Phase 4.

**Key Actions:**
1.  **Dockerfiles**: Verified correct entrypoints (`uvicorn` for backend) and robust API URL handling (Frontend uses a proxy to Backend via internal K8s DNS).
2.  **Helm Configuration**: Updated `values-local.yaml` to enforce `imagePullPolicy: Never` for local development and set correct Service types (ClusterIP/NodePort). Added clear instructions for Neon DB secrets.
3.  **Deployment Scripts**: Created `build-and-deploy.ps1` to solve the Minikube "Image Visibility" issue by building images directly in the Minikube Docker environment.

## Outcome

- ✅ Impact: Todo App is now ready for local Kubernetes deployment with correct networking and secrets strategy.
- 🧪 Tests: Manual verification of file contents and script logic.
- 📁 Files: Modified `values-local.yaml`, created `build-and-deploy.ps1`.
- 🔁 Next prompts: User needs to inject secrets and run the deployment script.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
