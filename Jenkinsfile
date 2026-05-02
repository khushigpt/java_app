pipeline {
	agent any
	environment {
		DOCKER_IMAGE="kubekhushigpt/ci-cd-app:latest"
		}
	stages {
		stage('Debug Code') {
    	steps {
        	sh 'cat app.js'
    	}
		}
		stage('Checkout Code') {
    steps {
        git branch: 'main', url: 'https://github.com/khushigpt/java_app.git'
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
		stage('Run Container') {
		steps {
			sh 'docker rm -f my-container || true'
			sh 'docker run -d --name my-container -p 3000:3000 $DOCKER_IMAGE'
			}
		}
		stage('Verify Deployment') {
    		steps {
        		sh '''
        		echo "Waiting for pod to be ready..."
        		sleep 10

        		POD=$(kubectl get pods -l app=ci-cd-app -o jsonpath="{.items[0].metadata.name}")
        		echo "Testing pod: $POD"

        		kubectl exec $POD -- curl -s http://localhost:3000
        		'''
    		}
		}
		stage('Cleanup') {
		steps {
		sh 'docker rm -f my-container || true'
		}
		}
	}
}

