pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "kubekhushigpt/ci-cd-app:latest"
        KUBECONFIG = "/var/jenkins_home/.kube/config"
    }

    stages {

        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/khushigpt/java_app.git'
            }
        }

        stage('Debug Code') {
            steps {
                sh 'echo "Showing app.js content:"'
                sh 'cat app.js || true'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build --no-cache -t $DOCKER_IMAGE .'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                }
            }
        }

        stage('Push Image') {
            steps {
                sh 'docker push $DOCKER_IMAGE'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                export KUBECONFIG=/var/jenkins_home/.kube/config
                kubectl apply -f deployment.yaml
                kubectl apply -f service.yaml
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                export KUBECONFIG=/var/jenkins_home/.kube/config
                echo "Checking pods..."
                kubectl get pods
                '''
            }
        }
    }
}
