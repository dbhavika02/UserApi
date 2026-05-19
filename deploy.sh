#!/bin/bash

SERVER="root@31.97.202.103"
IMAGE="dbhavika02/basicexpress:latest"
CONTAINER="basicexpress"

echo "Building Docker image..."
docker build -t $IMAGE .

if [ $? -ne 0 ]; then
    echo "Docker build failed"
    exit 1
fi

echo "Pushing image to Docker Hub..."
docker push $IMAGE

if [ $? -ne 0 ]; then
    echo "Docker push failed"
    exit 1
fi

echo "Deploying on server..."

ssh $SERVER << EOF

docker pull $IMAGE

docker stop $CONTAINER || true
docker rm $CONTAINER || true

docker run -d \
-p 5000:5000 \
--restart always \
--name $CONTAINER \
$IMAGE

EOF

echo "Deployment completed"