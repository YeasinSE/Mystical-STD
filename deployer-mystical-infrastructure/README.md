# Mystical deployer infrastructure

Deployer infrastructure is a container thats include all required tools for processing deploy operation on project and deploy to aws s3. Are you confirm enabled kafka server and
create an bucket name 'mystical-app' in s3.


### Follow the instruction step by step
Before go to step you should be install docker in your system and create an 'mystical-app' bucket on aw s3.


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
cd project-root && docker build -t deployer-mystical-infrastructure .
```

#### Step 5: Run contaner in localy for testing.
```sh
docker run -it \
-e PROJECT_URL=https://github.com/YeasinSE/mystical-app.git \
-e PROJECT_ID=yeasinsapp \
-e PROCESS_ID=f44149e8-ae53-48f3-9f5c-31eab61b0941 \
-e UUID=2d2441d5-35f4-4b24-a23a-c9af60ce7a7c \
-e AUTHOR_ID=7545787ererwer87 \
-e AUTHOR_EMAIL=yeasin.eng@yahoo.com \
-e NOTIFY=email \
-e VERSION=1 \
-e ORG_PROVIDER=mysticalcloud \
-e ORG_NAME=mystical \
-e ORG_PROJECT_KEY=yeasinapp \
-e ORG_HOST=https://mystical-app.s3.amazonaws.com \
 deployer-mystical-infrastructure bash
```

```
UUID= project uuid thats you want to deploy
PROCESS_ID= new deploy request uuuid
ORG_PROVIDER=mysticalcloud  // don't change
ORG_NAME=dmystical // don't change
ORG_PROJECT_KEY=yeasinsapp // Build project url based on this key
ORG_HOST=https://mystical-app.s3.amazonaws.com  //don't change
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
- Give task name like deployer-mystical-infrastructure-task
- Remove http 80 port from port mapping in container-1 section
- Give image Url(copy deployer mystical image url from ECR) and name    (deployer-mystical-infrastructure) in container-1 section
- Click Create

`NB:` cluster and task definitions name has mensioned on deployer consumer server.