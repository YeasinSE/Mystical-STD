const {ECSClient, RunTaskCommand} = require('@aws-sdk/client-ecs');

module.exports = (function(){

    /**
     * Connect aws ECS
     */
    const _ecsClient = new ECSClient({
        region:"us-east-1",
        credentials:{
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_KEY
        }
    });

    /**
     * Pick requested task defination
     * 
     * @param {String} provider 
     * @returns {String} task defination name
     */
    const getTaskDefination = async (provider) => {
        return {
            "mysticalcloud": {name: process.env.TASK_DEFINITION_MYSTICAL, container: process.env.CONTAINER_MYSTICAL},
        }[provider];
    }
    
    class AWSECSClient{

        /**
         * Publish log data to kafka
         */
        async executeTask(project){
            const task = await getTaskDefination(project?.provider);
            console.log("=== Task Defination =======");
            console.log(task);
            await _ecsClient.send(new RunTaskCommand({
                cluster: process.env.CLUSTER_NAME,
                taskDefinition: task.name, // deployer task definition name in aws
                launchType: process.env.LAUNCH_TYPE,
                count: Number(process.env.COUNT),
                networkConfiguration:{
                    awsvpcConfiguration:{
                        assignPublicIp: 'ENABLED',
                        subnets:['subnet-008f7154af4d0a36e', 'subnet-067f776fc8b02b392', 'subnet-0a3921055f2d82243', 'subnet-0e33865c0fae2d6cf', 'subnet-0e00f23be6997f8ad', 'subnet-0f2dd512194490110'],
                        securityGroups:['sg-03c39f97bca9a6ccf']
                    }
                },
                overrides:{
                    containerOverrides:[
                        {
                            name: task.container,
                            environment:[
                                {
                                    name:"PROJECT_URL", 
                                    value: project.projectUrl
                                }, 
                                {
                                    name:"UUID",
                                    value: project.projectUUID
                                },
                                {
                                    name:"PROJECT_ID", 
                                    value: project.projectId
                                },
                                {
                                    name:"PROCESS_ID", 
                                    value: project.processId
                                },
                                {
                                    name:"AUTHOR_ID", 
                                    value: project.authorId
                                },
                                {
                                    name: "AUTHOR_EMAIL",
                                    value: project.authorEmail
                                },
                                {
                                    name: "NOTIFY",
                                    value: project.notify
                                },
                                {
                                    name:"VERSION", 
                                    value: ""+ project.version
                                },
                                {
                                    name:"ORG_PROVIDER", 
                                    value: project.provider
                                },
                                {
                                    name:"ORG_PROJECT_KEY", 
                                    value: project.projectId
                                },
                                {
                                    name:"ORG_HOST",
                                    value: project.hostUrl
                                }
                            ]
                        }
                    ]
                }
            }));
        }
    }

    return AWSECSClient;
})();