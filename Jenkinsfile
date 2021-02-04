pipeline {
     agent { label 'slave01' }
     stages {
        stage("Prepare Environment") {
            steps {
                git branch: 'dev', credentialsId: 'bdff7135-2bfa-430c-96e8-bb8669a864d4', url: 'https://github.com/SROADev/react.git'
            }
        }
        stage('get_commit_details') {
           steps {
            script {
             env.GIT_COMMIT_MSG = sh (script: 'git log -1 --pretty=%B ${GIT_COMMIT}', returnStdout: true).trim()
             env.GIT_AUTHOR = sh (script: 'git log -1 --pretty=%cn ${GIT_COMMIT}', returnStdout: true).trim()
           }
         }
      }
        stage("Build"){
            steps {
                sh "sudo chown -R $USER:$USER  . "
                sh "rsync -arv --exclude={.git,node_modules,build,centos,dist-server}  /home/ubuntu/workspace/sroa-react-dev  centos@174.129.246.24:/home/centos/"
            }
            post {
           failure {
                slackSend (channel: 'jenkins', color: '#FF0000',  notifyCommitters: true, teamDomain: 'sroa', tokenCredentialId: '2856612f-e62b-4423-9dc7-d5770ba7c6c1', message: """Build Failed: Job: ${env.JOB_NAME} Build #${env.BUILD_NUMBER} Build:${env.BUILD_URL}) Comitted by: ${env.GIT_AUTHOR} Last commit message: '${env.GIT_COMMIT_MSG}'""")
                   }
           success {
               slackSend (channel: 'jenkins', color: '#00FF00', notifyCommitters: true, teamDomain: 'sroa', tokenCredentialId: '2856612f-e62b-4423-9dc7-d5770ba7c6c1', message: """Build Completed Successfully: Job: ${env.JOB_NAME} Build #${env.BUILD_NUMBER} Build: ${env.BUILD_URL}) Comitted by: ${env.GIT_AUTHOR} Last commit message: '${env.GIT_COMMIT_MSG}'""")
                   }
            }
        }
        stage("Publish Artifacts to s3"){
            steps {
                sh "/home/ubuntu/.local/bin/aws s3 sync /home/ubuntu/workspace/sroa-react-dev  s3://artifact-sroa/environments/dev/sroa-react-dev"
            }
          post {
            failure {
                 slackSend (channel: 'jenkins', color: '#FF0000',  notifyCommitters: true, teamDomain: 'sroa', tokenCredentialId: '2856612f-e62b-4423-9dc7-d5770ba7c6c1', message: """Artifacts Published to s3 failed: Job: ${env.JOB_NAME} Build #${env.BUILD_NUMBER} Build:${env.BUILD_URL}) Comitted by: ${env.GIT_AUTHOR} Last commit message: '${env.GIT_COMMIT_MSG}'""")
                    }
            success {
                slackSend (channel: 'jenkins', color: '#00FF00', notifyCommitters: true, teamDomain: 'sroa', tokenCredentialId: '2856612f-e62b-4423-9dc7-d5770ba7c6c1', message: """Artifacts Published to s3 completed: Job: ${env.JOB_NAME} Build #${env.BUILD_NUMBER} Build: ${env.BUILD_URL}) Comitted by: ${env.GIT_AUTHOR} Last commit message: '${env.GIT_COMMIT_MSG}'""")
                    }
             }
        }
        stage("Deploy") {
            steps {
                sh "ssh centos@174.129.246.24 'sudo cp -r /home/centos/sroa-react-dev/   /var/www/html/'"
                sh "ssh centos@174.129.246.24 'cd /var/www/html/ && sudo chown nginx:nginx -R  /var/www/html/sroa-react-dev/ && sudo chmod 777 -R  /var/www/html/sroa-react-dev'"
                sh "ssh centos@174.129.246.24 'cd /var/www/html/sroa-react-dev/ && sudo npm install pm2 -g'"
                sh "ssh centos@174.129.246.24 'cd /var/www/html/sroa-react-dev/ && sudo yum install -y psmisc'"
                sh "ssh centos@174.129.246.24 'cd /var/www/html/sroa-react-dev/ && sudo killall -9 node'"
                sh "ssh centos@174.129.246.24 'cd /var/www/html/ && sudo chmod +x ./port-check.sh'"
                sh "ssh centos@174.129.246.24 'cd /var/www/html/ && sudo ./port-check.sh'"
                sh "ssh centos@174.129.246.24 'cd /var/www/html/sroa-react-dev/ && sudo npm install forever -g'"
                sh "ssh centos@174.129.246.24 'cd /var/www/html/sroa-react-dev/ && sudo npm install'"
                sh "ssh centos@174.129.246.24 'cd /var/www/html/sroa-react-dev/ && sudo pm2 start \"npm run dev\"'"
                sh "ssh centos@174.129.246.24 'cd /var/www/html/sroa-react-dev/  && sudo systemctl restart nginx'"
                sh "ssh centos@174.129.246.24 'cd /home/centos/sroa-react-dev/ && sudo chown root:centos -R  /home/centos/sroa-react-dev/  && sudo chmod 777 -R  /home/centos/sroa-react-dev'"
                sh "ssh centos@174.129.246.24 'rm -rf /home/centos/sroa-react-dev/'"
            }
            post {
           failure {
                slackSend (channel: 'jenkins', color: '#FF0000',  notifyCommitters: true, teamDomain: 'sroa', tokenCredentialId: '2856612f-e62b-4423-9dc7-d5770ba7c6c1', message: """Deploy Failed: Job: ${env.JOB_NAME} Build #${env.BUILD_NUMBER} Build:${env.BUILD_URL}) Comitted by: ${env.GIT_AUTHOR} Last commit message: '${env.GIT_COMMIT_MSG}'""")
                   }
           success {
               slackSend (channel: 'jenkins', color: '#00FF00', notifyCommitters: true, teamDomain: 'sroa', tokenCredentialId: '2856612f-e62b-4423-9dc7-d5770ba7c6c1', message: """Deploy Completed Successfully: Job: ${env.JOB_NAME} Build #${env.BUILD_NUMBER} Build: ${env.BUILD_URL}) Comitted by: ${env.GIT_AUTHOR} Last commit message: '${env.GIT_COMMIT_MSG}'""")
                   }
            }
        }
    }
}
