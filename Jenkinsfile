pipeline {
    agent any

    environment {
        // ==== EDIT THIS: your Docker Hub username ====
        DOCKERHUB_USER  = 'hanarrebwarr'
        IMAGE_NAME      = "hanarrebwarr/express-cicd-app"
        IMAGE_TAG       = "${env.BUILD_NUMBER}"
        // ID of the 'Username with password' credential you add in Jenkins
        DOCKERHUB_CREDS = 'dockerhub-creds'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build / Install deps') {
            steps {
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
            }
        }

        stage('Build Docker image') {
            steps {
                bat "docker build -t %IMAGE_NAME%:%IMAGE_TAG% -t %IMAGE_NAME%:latest ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                        credentialsId: "${DOCKERHUB_CREDS}",
                        usernameVariable: 'DH_USER',
                        passwordVariable: 'DH_PASS')]) {
                    bat '''
                        echo %DH_PASS% | docker login -u %DH_USER% --password-stdin
                        docker push %IMAGE_NAME%:%IMAGE_TAG%
                        docker push %IMAGE_NAME%:latest
                        docker logout
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline succeeded. Pushed %IMAGE_NAME%:%IMAGE_TAG% and :latest"
        }
        failure {
            echo 'Pipeline failed - check the stage logs above.'
        }
        always {
            bat(script: 'docker image prune -f', returnStatus: true)
        }
    }
}
