// "pipeline" must be top level
pipeline {
    agent any //agent is where to execute, any at our company is kubernetes where container is

    stages { //where the work actually happens

        stage("build"){
            steps {
                echo 'Building the application'
            }
        }
        
        stage("test"){
            steps{
                echo 'Testing the application'
            }
        }

        stage("deploy"){
            steps{
                echo 'Deploying the application'
            }
        }

    }
}