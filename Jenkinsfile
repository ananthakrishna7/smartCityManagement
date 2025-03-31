pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                dir("backend"){
                  sh 'npm install'
                  sh 'npm run test'
                }
            }
        }
        stage('Build') {
            steps {
              dir("frontend"){
                  sh 'npm install'
                  sh 'npm run build'
                }
            }
        }
    }
}

