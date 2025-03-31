pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                dir("backend"){
                  sh 'npm run test'
                  }
            }
        }
        stage('Build') {
            steps {
              dir("frontend"){
                  sh 'npm run build'
                }
            }
        }
    }
}

