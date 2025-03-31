pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                sh 'cd backend'
                sh 'npm run test'
            }
        }
        stage('Build') {
            steps {
                sh 'cd ../frontend'
                sh 'npm run build'
            }
        }
    }
}

