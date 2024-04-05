# Mystical scanner infrastructure

Mystical infrastructure is a container thats include all required tools for processing scan operation on project and send report to aws s3. Are you confirm enabled kafka server and create an bucket name 'mystical-app-report' in s3.

`NB: ` Mystcial infrastructure internaly use bearer cli for scanning project.

### Follow the instruction step by step
Before go to step you should be install docker in your system and create an project on sonar cloud for visualization project scan report.


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
cd project-root && docker build -t scanner-mystical-infrastructure .
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
-e ORG_PROVIDER=mysticalcloud \
-e ORG_NAME=mystical \
-e ORG_PROJECT_KEY=yeasinscan \
-e ORG_HOST=https://mystical-app-report.s3.amazonaws.com \
 scanner-mystical-infrastructure bash
```

```
UUID= project uuid thats you want to scan
PROCESS_ID= new scan request uuuid
ORG_PROVIDER=mysticalcloud  // don't change
ORG_NAME=mystical // don't change
ORG_PROJECT_KEY=yeasinsapp // store scan repprt based on this key

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
- Give task name like scanner-infrastructure-mystical-task
- Choose 5 GB memory in infrastructure requirements section
- Remove http 80 port from port mapping in container-1 section
- Give image Url(copy mystical scanner image url from ECR) and name    (scanner-mystical-infrastructure) in container-1 section
- Click Create

`NB:` cluster and task definitions name has mensioned on scanner consumer server.