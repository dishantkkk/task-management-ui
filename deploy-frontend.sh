#!/bin/bash

# === CONFIGURATION ===
DOCKERHUB_USERNAME="dishantkkk"
VERSION=$(date +%Y%m%d%H%M%S)
FRONTEND_IMAGE="$DOCKERHUB_USERNAME/task-management-ui:$VERSION"
K8S_DIR="./k8s"
DEPLOYMENT_YAML="$K8S_DIR/frontend-deployment.yaml"

# === STEP 1: Build React App ===
echo "🧱 Building React frontend..."
npm install
npm run build

# === STEP 2: Build & Push Docker Image ===
echo "🐳 Building frontend Docker image: $FRONTEND_IMAGE"
docker build -t "$FRONTEND_IMAGE" .

echo "🚀 Pushing frontend image to DockerHub..."
docker push "$FRONTEND_IMAGE"

# === STEP 3: Update Image Tag in Deployment YAML ===
echo "📝 Updating deployment YAML with image: $FRONTEND_IMAGE"
sed -i.bak "s|image: $DOCKERHUB_USERNAME/task-management-ui:.*|image: $FRONTEND_IMAGE|" "$DEPLOYMENT_YAML"

# === STEP 4: Apply K8s Manifests ===
echo "☸️ Applying frontend K8s manifests..."
kubectl apply -f "$K8S_DIR/"

# === STEP 5: Wait for Pod to Be Ready ===
echo "⏳ Waiting for frontend pod to be ready..."
kubectl wait --for=condition=ready pod -l app=task-management-ui --timeout=90s

# === STEP 6: Add buffer before port-forward ===
echo "🕐 Giving app some time to stabilize (5s)..."
sleep 5

# === STEP 7: Port-Forward Frontend Service ===
echo "🔌 Starting port-forward: service/task-management-ui-service → localhost:3000 ..."
kubectl port-forward service/task-management-ui-service 3000:80 > frontend.log 2>&1 &
FRONTEND_PID=$!
echo $FRONTEND_PID > frontend.pid

# === STEP 8: Verify Port is Open ===
sleep 2
if lsof -i :3000 > /dev/null; then
  echo "✅ Frontend is now accessible at http://localhost:3000"
else
  echo "❌ Port 3000 is not responding. Port-forward may have failed. Check frontend.log for details."
fi

# === DONE ===
echo "🚀 Frontend deployment complete with version: $VERSION"
echo "🛑 To stop port-forwarding, run: kill \$(cat frontend.pid)"
