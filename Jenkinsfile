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
				sh '''
				echo "Checking if container is running"
				docker ps
				echo "Application logs:"
				docker logs my-container

		                echo "Waiting for app to be ready..."

                		for i in {1..10}; do
		                    docker exec my-container curl -s http://localhost:3000 && exit 0
                	    	echo "App not ready yet... retrying"
                    		sleep 2
                		done

                		echo "App failed to respond"
                		exit 1
                		'''

			}
		}
		stage('Cleanup') {
		steps {
		sh 'docker rm -f my-contaier || true'
		}
		}
	}
}

