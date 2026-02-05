pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'ansarisjd'   // Dockerhub Username
        DOCKERHUB_CREDS = credentials('dockerhub-creds')
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Repository cloned successfully'
            }
        }

        stage('Docker Login') {
            steps {
                sh """
                  echo \$DOCKERHUB_CREDS_PSW | docker login -u \$DOCKERHUB_CREDS_USR --password-stdin
                """
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('ems-java-backend-service') {
                    sh "docker build -t ${DOCKERHUB_USERNAME}/ems-backend:latest ."
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('ems-react-frontend-ui') {
                    sh "docker build -t ${DOCKERHUB_USERNAME}/ems-frontend:latest ."
                }
            }
        }

        stage('Push Images') {
            steps {
                sh """
                  docker push ${DOCKERHUB_USERNAME}/ems-backend:latest
                  docker push ${DOCKERHUB_USERNAME}/ems-frontend:latest
                """
            }
        }

        stage('Cleanup') {
            steps {
                sh 'docker system prune -af'
            }
        }
    }
}
