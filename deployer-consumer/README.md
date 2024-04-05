# Mystical deployer consumer server

Handle Customer all deploy request and process to deploy project on server. currently support deploy project on AWS s3.


### Follow the instruction step by step
Before go to step you should be install node in your system. i used node 20.x version.


#### Step 1: Define the AWS credentials in .env file
```
AWS_ACCESS_KEY=
AWS_SECRET_KEY=
```

#### Step 2: Define the AWS ECS cluster and task information in .env file
```
CLUSTER_NAME=arn:aws:ecs:us-east-1:accountId:cluster/mystical-infrastructure-cluster

TASK_DEFINITION_MYSTICAL=arn:aws:ecs:us-east-1:accountId:task-definition/deployer-mystical-infrastructure-task
```

#### Step 3: Define the AWS ECR container information in .env file
```
CONTAINER_MYSTICAL=deployer-mystical-infrastructure
```

#### Step 4: Define the AWS deployer queue path in .env file
```
CONSUMER_QUEUE_URL=https://sqs.us-east-1.amazonaws.com/accountId/mystical-deployer-queue
```

#### Step 5: Define the REDIS path in .env file
```
REDIS_URL=
```

#### Step 6: Move project root and Install dependency
```sh
cd project-root && npm install
```

#### Step 7: Run server
```sh
npm start
```