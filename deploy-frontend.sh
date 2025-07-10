#!/bin/bash

DOCKERHUB_USERNAME="dishantkkk"
FRONTEND_IMAGE="$DOCKERHUB_USERNAME/task-management-ui:latest"

echo "🧱 Building React frontend..."
npm install
npm run build

echo "🐳 Building frontend Docker image..."
docker build -t $FRONTEND_IMAGE .

echo "🚀 Pushing frontend image to DockerHub..."
docker push $FRONTEND_IMAGE

echo "☸️ Applying frontend K8s manifests..."
kubectl apply -f k8s/

echo "⏳ Waiting for frontend pod to be ready..."
kubectl wait --for=condition=ready pod -l app=task-management-ui --timeout=60s

echo "🔌 Port-forwarding frontend service on http://localhost:3000..."
kubectl port-forward service/task-management-ui-service 3000:80 > frontend.log 2>&1 &
FRONTEND_PID=$!
echo $FRONTEND_PID > frontend.pid

echo "✅ Frontend accessible at http://localhost:3000"
echo "🛑 Run 'kill \$(cat frontend.pid)' to stop port-forward"
