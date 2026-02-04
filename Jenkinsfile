pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Repository cloned successfully'
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('ems-java-backend-service') {
                    sh 'docker build -t ems-backend:latest .'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('ems-react-frontend-ui') {
                    sh 'docker build -t ems-frontend:latest .'
                }
            }
        }

        stage('Build Nginx Image') {
            steps {
                dir('Nginx') {
                    sh 'docker build -t ems-nginx:latest .'
                }
            }
        }
    }
}
