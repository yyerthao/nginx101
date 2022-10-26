//i.e. CODE_CHANGES = getGitChanges() 
// The above would be some groovy script to check if changes were made in code 

// "pipeline" must be top level
pipeline {
    agent any //agent is where to execute, any at our company is kubernetes where container is

    // defining selections we want
    parameters {
        // string(name: 'VERSION', defaultValue: '', description: 'Version to deploy to Prod')
        choice(name: 'VERSION', choices: ['1.0', '1.1', '1.2'], description: '')
        booleanParam(name: 'executeTests', defaultValue: true, description: '')
    }

    // when we want certain tools available for this pipeline
    // tools {
    //     maven 'Maven'
    //     gradle
    // }

    // environment {
    //     NEW_VERSION = '1.3.0'
    //     SERVER_CREDENTIALS = credentialId('server-credentials') // parameter is generated credential from gitLab
    // }

    stages { //where the work actually happens


        stage("build"){
            steps {
                echo 'Building the application'
                echo "Building version ${NEW_VERSION}"

            }
        }
        
        stage("test"){
            when { //code in here executes if condition is met 
                expression {
                    params.executeTests == true
                }
            }
            steps{
                echo 'Testing the application'
            }
        }

        stage("deploy"){
            steps{
                echo 'Deploying the application'
                //echo "Deploying with ${SERVER_CREDENTIALS}"
                //sh "${SERVER_CREDENTIALS}"
                // above 2 lines can be used but can use below to do same thing
                echo "Deploying version ${VERSION}"
                //withCredentials([
                    //usernamePassword(credentials: 'server-credentials', usernameVariable: USER, passwordVariable: PWD)]){
                    //sh "Some script with user ${USER} and pw ${PWD}"
                //}

            }
        }

        //Can execute a post
        post {
            always {
                echo 'POST MSG: Pipeline ran'
            }
            success{ // code in here only exexcutes if build succeeded
                echo 'POST MSG: Test succeeded'
            }
            failure { // code in here only executes if build failed
                echo 'POST MSG: Test didnt succeed, pdiddy'
            }
        }

    }
}//end pipeline
