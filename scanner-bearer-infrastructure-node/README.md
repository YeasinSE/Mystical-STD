# Mystical Bearer infrastructure

Bearer infrastructure is a container thats include all required tools for processing scan operation on  project and send report to bearer cloud server. Are you confirm enabled kafka server.

`Note:` Mystical Bearer infrastructure was not tested now. if any one have bearer cloud access you can test this infrastructure OR you can share credential to me.


### Follow the instruction step by step
Before go to step you should be install docker in your system and create an project on bearer cloud for visualization project scan report.


#### Step 1: Define the AWS credentials in .env file
```
AWS_ACCESS_KEY=
AWS_SECRET_KEY=
```

#### Step 2: Define the Kafka user, password and broker information in .env file
```
KAFKA_USER=
KAFKA_PASSWORD=
KAFKA_BROKERS=
```

#### Step 3: Define the AWS notification queue path in .env file
```
NOTIFICATION_QUEUE_URL=https://sqs.us-east-1.amazonaws.com/accountId/mystical-notification-queue
```

#### Step 4: Define the REDIS path in .env file
```
REDIS_URL=
```

#### Step 4: Move project root and build docker Image
```sh
cd project-root && docker build -t scanner-bearer-infrastructure .
```

#### Step 5: Run contaner in localy for testing.
```sh
docker run -it \
-e PROJECT_URL=https://github.com/shieldfy/vulnerable-nodejs-project.git \
-e PROJECT_ID=yeasinscanapp \
-e PROCESS_ID=22c44a98-2213-4fea-9f20-d3302c0cfbfe \
-e UUID=f747021e-f133-4d63-b904-5bc0c59f375b \
-e AUTHOR_ID=7545787ererwer87 \
-e AUTHOR_EMAIL=yeasin.eng@yahoo.com \
-e NOTIFY=email \
-e VERSION=1 \
-e ORG_PROVIDER=bearercloud \
-e ORG_NAME=devnet \
-e ORG_PROJECT_KEY=devnet_yeasinscan \
-e ORG_HOST=https://bearercloud.io \
-e ACCESS_TOKEN= \
 scanner-bearer-infrastructure bash
```

```
ORG_PROVIDER=bearercloud // don't change
ORG_NAME=devnet // sonar cloud org name thats you created
ORG_PROJECT_KEY=devnet_yeasinscan // sonar cloud org project key thats you created
ORG_HOST=https://bearercloud.io  //don't change
ACCESS_TOKEN=  // project access token
```
#### Push image in AWS ECR
https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html

#### Create an cluster and task in AWS ECS
- Login AWS console
- Search ECS and click
- Create new cluster(click left hand side cluster menu)
- click left hand side task definitions menu
- Click Create new task definition(dropdown menu)
- Choose new task definition
- Give task name like scanner-infrastructure-bearer-task
- Choose 5 GB memory in infrastructure requirements section
- Remove http 80 port from port mapping in container-1 section
- Give image Url(copy sonar scanner image url from ECR) and name    (scanner-infrastructure-bearer) in container-1 section
- Click Create

`NB:` cluster and task definitions name has mensioned on scanner consumer server.
