#!/bin/bash

# === CONFIGURATION ===
DOCKERHUB_USERNAME="dishantkkk"
FRONTEND_IMAGE="$DOCKERHUB_USERNAME/task-management-ui:latest"

# === STEP 1: Build React App ===
echo "🧱 Building React frontend..."
npm install
npm run build

# === STEP 2: Build & Push Docker Image ===
echo "🐳 Building frontend Docker image..."
docker build -t "$FRONTEND_IMAGE" .

echo "🚀 Pushing frontend image to DockerHub..."
docker push "$FRONTEND_IMAGE"

# === STEP 3: Apply K8s Manifests ===
echo "☸️ Applying frontend K8s manifests..."
kubectl apply -f k8s/

# === STEP 4: Wait for Pod to Be Ready ===
echo "⏳ Waiting for frontend pod to be ready..."
kubectl wait --for=condition=ready pod -l app=task-management-ui --timeout=90s

# === STEP 5: Add buffer before port-forward ===
echo "🕐 Giving app some time to stabilize (5s)..."
sleep 5

# === STEP 6: Port-Forward Frontend Service ===
echo "🔌 Starting port-forward: service/task-management-ui-service → localhost:3000 ..."
kubectl port-forward service/task-management-ui-service 3000:80 > frontend.log 2>&1 &
FRONTEND_PID=$!
echo $FRONTEND_PID > frontend.pid

# === STEP 7: Verify Port is Open ===
sleep 2
if lsof -i :3000 > /dev/null; then
  echo "✅ Frontend is now accessible at http://localhost:3000"
else
  echo "❌ Port 3000 is not responding. Port-forward may have failed. Check frontend.log for details."
fi

# === DONE ===
echo "🚀 Frontend deployment complete."
echo "🛑 To stop port-forwarding, run: kill \$(cat frontend.pid)"
