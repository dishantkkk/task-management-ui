pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "dishantkkk/task-management-ui"
        IMAGE_TAG = "${BUILD_NUMBER}"
        FULL_IMAGE_NAME = "${DOCKER_IMAGE}:${IMAGE_TAG}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                docker build -t ${FULL_IMAGE_NAME} -f Dockerfile .
                """
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-cred', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    docker push ${FULL_IMAGE_NAME}
                    """
                }
            }
        }

        stage('Patch Deployment YAML') {
            steps {
                sh """
                sed 's|image: dishantkkk/task-management-ui:.*|image: ${FULL_IMAGE_NAME}|' k8s/frontend-deployment.yaml > k8s/frontend-deployment-patched.yaml
                """
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh """
                kubectl apply -f k8s/frontend-deployment-patched.yaml
                kubectl apply -f k8s/frontend-service.yaml
                """
            }
        }
    }

    post {
        success {
            echo "Frontend deployed successfully with image: ${FULL_IMAGE_NAME}"
        }
        failure {
            echo "Frontend deployment failed"
        }
    }
}
