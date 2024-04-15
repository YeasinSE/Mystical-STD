# Mystical deployer infrastructure

In the fast-paced world of software development, efficient deployment pipelines are essential for delivering high-quality products to users. The Deployer-Mystical-Infrastructure, built on Node.js, Kafka, and AWS S3, represents a cutting-edge solution designed to streamline the build and deployment process for production environments. In this infrastructure, we delve into the architecture and capabilities of the Deployer-Mystical-Infrastructure, exploring how it enables seamless deployment of projects to AWS S3 for production use.

#### `The Significance of Deployment Efficiency:`
Efficient deployment processes are essential for delivering new features, updates, and bug fixes to web applications promptly. Delays or errors during deployment can disrupt user experience, impact business operations, and erode customer trust. Streamlining deployment workflows and ensuring robust error handling mechanisms are critical for maintaining agility and reliability in software delivery pipelines.

#### `Introducing the Deployer-Mystical-Infrastructure:`
The Deployer-Mystical-Infrastructure is a sophisticated deployment platform built on Node.js, Kafka, and AWS S3, designed to the build and deployment process for production environments. At its core, the infrastructure leverages Node.js for backend logic and Kafka for event-driven communication, enabling seamless integration with various components of the deployment pipeline. AWS S3 serves as the storage for hosting deployed projects, ensuring scalability, reliability, and high availability.

#### `Key Components and Functionality:`

  - `Node.js Backend:` The Deployer-Mystical-Infrastructure features a robust Node.js backend responsible for handling 
    deployment requests, orchestrating the build process, and coordinating deployment tasks. The backend logic is designed to 
    be modular and extensible, allowing for easy integration with existing infrastructure and deployment workflows.

 - `Kafka Event Bus:` Kafka serves as the central communication hub within the infrastructure, facilitating real-time exchange 
   of deployment events and messages between different components. By leveraging Kafka's distributed messaging architecture, 
   the infrastructure ensures reliable and scalable communication, even under heavy load.

 - `AWS S3 Integration:` AWS S3 acts as the deployment target for projects, providing a scalable and reliable storage solution 
    for hosting deployed artifacts. The infrastructure seamlessly integrates with AWS S3, enabling deployment of projects to 
    production environments with minimal downtime and maximum efficiency.

#### `Deployment Workflow:`

  -  `Triggering Deployment Requests:` The Deployer Consumer Server initiates deployment requests for web applications, 
      triggering the Deployer-Mystical Infrastructure to commence the deployment process.

  -  `Orchestrating Build and Deployment Tasks:` Upon receiving a deployment request, the infrastructure orchestrates the 
      build and deployment tasks, including compiling source code, packaging artifacts, and deploying to AWS S3.

  - `Publishing Real-Time Events:` Throughout the build and deployment process, the infrastructure publishes deployment 
     events and messages to Kafka topics, providing real-time visibility into deployment progress and status.

  - `Deploying to AWS S3:` Once the build process is complete, the infrastructure deploys the generated artifacts to AWS S3, 
     making them accessible for production use.

  - `Notifying Stakeholders:` Finally, the infrastructure notifies stakeholders about the completion of the deployment 
     process, providing relevant information and status updates via email or other communication channels like slack, sms etc.

  - `Error Handling with Redis Pub/Sub:` In the event of system errors during deployment, the infrastructure publishes error 
     messages to Redis using the publish/subscribe (Pub/Sub) model. This allows for efficient error handling and 
     troubleshooting, ensuring timely resolution of deployment issues.


#### `Benefits of Deployer-Mystical-Infrastructure:`

  - `Automated Deployment Process:` The infrastructure automates build and deployment tasks, reducing manual effort and 
     enabling rapid delivery of web applications.
    
    - NOTE: Currently Deploying process task start via trigger from deployer consumer server based on client request
      via api  server. fully automation not support now.


  - `Scalability and Reliability:` Leveraging AWS services such as S3 and SQS, the infrastructure ensures scalability, 
     reliability, and high availability, even under heavy deployment workloads.
    
  - `Real-time Visibility:` By publishing deployment events to Kafka, the infrastructure provides real-time visibility into 
     deployment progress and status, enabling stakeholders to track deployments closely.
    
  - `Enhanced Efficiency:` With its streamlined deployment workflow, the infrastructure accelerates time-to-market, allowing 
     organizations to deliver updates to production environments rapidly and efficiently.

  - `Efficient Error Handling:` Using Redis Pub/Sub, the infrastructure facilitates efficient error handling and 
     troubleshooting, minimizing deployment downtime and ensuring seamless delivery of web applications.


`Are you confirm enabled kafka server and create an bucket name 'mystical-app' in s3.`


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


In conclusion, the Deployer-Mystical-Infrastructure represents a paradigm shift in deployment infrastructure, offering advanced capabilities and unparalleled efficiency. By leveraging Node.js, Kafka, aws SQS and AWS S3, the infrastructure automates the build and deployment process, streamlining production deployments and enhancing overall efficiency. As organizations continue to prioritize speed, reliability, and scalability in their deployment pipelines, investing in the Deployer-Mystical-Infrastructure becomes essential for achieving operational excellence and delivering exceptional software products to users.
