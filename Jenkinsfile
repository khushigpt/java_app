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
			sh 'docker rm -f mycontainer || true'
			sh 'docker run -d --name mycontainer -p 3000:3000 my-ci-app:latest'
			}
		}
		stage('Test Output') {
			steps {
				sh 'sleep 5'
				sh 'curl -s localhost:3000'
			}
		}
	}
}

