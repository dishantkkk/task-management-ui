pipeline {
    agent any

    environment {
        IMAGE_NAME = "dishantkkk/task-management-ui"
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        FULL_IMAGE_NAME = "${IMAGE_NAME}:${IMAGE_TAG}"
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
                sh '''
                docker build -t ${FULL_IMAGE_NAME} .
                '''
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-cred', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    docker push $FULL_IMAGE_NAME
                    '''
                }
            }
        }

        stage('Update Image Tag in k8s yaml') {
            steps {
                sh '''
                sed 's|image: dishantkkk/task-management-ui:.*|image: ${FULL_IMAGE_NAME}|' k8s/frontend-deployment.yaml > k8s/frontend-deployment-patched.yaml
                '''
            }
        }

        stage('Deploy App (k8s)') {
            steps {
                echo "Deploying app using patched k8s yaml"
                sh '''
                    kubectl apply -f k8s/frontend-deployment-patched.yaml
                    kubectl apply -f k8s/frontend-service.yaml
                '''
            }
        }
    }

    post {
        always {
            echo "Cleaning up workspace..."
            cleanWs()
        }
        success {
            echo '✅ Pipeline completed successfully'
        }
        failure {
            echo '❌ Pipeline failed'
        }
    }
}
