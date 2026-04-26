pipeline {
	agent any
	stages {
		stage('Build Docker Image') {
		steps {
			sh 'docker build -t my-ci-app:latest .'
			}
		}
		stage('Run Container') {
		steps {
			sh 'docker rm -f my-container || true'
			sh 'docker run -d --name my-container -p 3000:3000 my-ci-app:latest'
			}
		}
		stage('Test Output') {
			steps {
				sh 'sleep 10'
				sh 'docker logs my-container'
				sh 'curl -s localhost:3000'
			}
		}
	}
}

