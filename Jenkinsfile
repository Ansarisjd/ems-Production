pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'ansarisjd'
        DOCKERHUB_CREDS = credentials('dockerhub-creds')
        VERSION = "1.0.${BUILD_NUMBER}"
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
                    sh "docker build -t ${DOCKERHUB_USERNAME}/ems-backend:${VERSION} ."
                    sh "docker tag ${DOCKERHUB_USERNAME}/ems-backend:${VERSION} ${DOCKERHUB_USERNAME}/ems-backend:latest"
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('ems-react-frontend-ui') {
                    sh "docker build -t ${DOCKERHUB_USERNAME}/ems-frontend:${VERSION} ."
                    sh "docker tag ${DOCKERHUB_USERNAME}/ems-frontend:${VERSION} ${DOCKERHUB_USERNAME}/ems-frontend:latest"

                }
            }
        }

        stage('Build Nginx Image') {
            steps {
                dir('Nginx') {
                    sh "docker build -t ${DOCKERHUB_USERNAME}/ems-nginx:${VERSION} ."
                    sh "docker tag ${DOCKERHUB_USERNAME}/ems-nginx:${VERSION} ${DOCKERHUB_USERNAME}/ems-nginx:latest"
                }
            }
        }

        stage('Push Images') {
            steps {
                sh """
                  docker push ansarisjd/ems-backend:${VERSION}
                  docker push ansarisjd/ems-backend:latest

                  docker push ansarisjd/ems-frontend:${VERSION}
                  docker push ansarisjd/ems-frontend:latest

                  docker push ansarisjd/ems-nginx:${VERSION}
                  docker push ansarisjd/ems-nginx:latest
                """
            }
        }

        stage('Deploy to EC2') {
            steps {
                sh '''
                  export VERSION=${VERSION}
                  docker compose down || true
                  docker compose pull
                  docker compose up -d
                '''
            }
        }

        stage('Cleanup') {
            steps {
                sh 'docker system prune -af'
            }
        }
    }
}
