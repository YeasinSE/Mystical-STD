# Mystical sonar infrastructure

In today's software-driven world, maintaining high code quality is paramount for delivering robust and reliable applications. The Scanner-Sonar Infrastructure, built on Node.js, Sonar CLI, Kafka, AWS SQS, represents a groundbreaking solution designed to elevate code quality by seamlessly integrating static code analysis into the development pipeline. In this service, we delve into the architecture and capabilities of the Scanner-Sonar Infrastructure, illustrating how it revolutionizes code quality management through automated scanning and reporting.


#### `The Imperative of Code Quality Management:`
As software systems become increasingly complex, ensuring code quality is critical for minimizing bugs, vulnerabilities, and technical debt. Static code analysis tools, such as SonarQube, play a pivotal role in identifying code smells, security vulnerabilities, and maintainability issues early in the development process. By integrating static code analysis into the development pipeline, organizations can proactively address code quality concerns and deliver higher-quality software products.

#### `Introducing the Scanner-Sonar Infrastructure:`
The Scanner-Sonar Infrastructure is a sophisticated code quality management platform built on Node.js, Sonar CLI, Kafka, AWS SQS, designed to automate the scanning process and streamline code quality reporting. At its core, the infrastructure leverages Sonar CLI for static code analysis, Kafka for event-driven communication, and AWS services for storage and queuing, providing a scalable and reliable solution for code quality management.

#### `Key Components and Functionality:`

  - `Node.js Backend:` The Scanner-Sonar Infrastructure features a robust Node.js backend responsible for handling scanning 
     requests, orchestrating the scanning process, and managing communication with other components. The backend logic is 
     designed to be modular and extensible, enabling seamless integration with existing development pipelines.

  - `Sonar CLI Integration:` Sonar CLI serves as the primary tool for conducting static code analysis, detecting code smells, 
     bugs, vulnerabilities, and other quality issues. The infrastructure leverages Sonar CLI to perform code scans on project 
     repositories and generate detailed analysis reports and send report to sonar cloud.

  - `Kafka Event Bus:` Kafka acts as the central communication hub within the infrastructure, facilitating real-time exchange 
    of scanning events and messages between different components. By leveraging Kafka's distributed messaging architecture, 
    the infrastructure ensures reliable and scalable communication, even under heavy load.

#### `Scanning Workflow:`

  - `Receiving Scanning Requests:` The Scanner-Sonar Infrastructure receives scanning requests from manual triggers via 
     Scanner Consumer which client request from api server.

  - `Orchestrating the Scanning Process:` Upon receiving a scanning request, the infrastructure orchestrates the scanning 
     process, invoking Sonar CLI to perform static code analysis on project repositories.

  - `Generating Scanning Reports:` Once the scanning process is complete, Sonar CLI generates detailed analysis reports, 
     identifying code smells, bugs, vulnerabilities,  other quality issues and send report to sonar cloud server.

  - `Publishing Scanning Events:` Throughout the scanning process, the infrastructure publishes scanning events and messages 
    to Kafka topics, providing real-time visibility into scanning progress and status.

  - `Notifying Via AWS SQS:` Finally, the infrastructure notifies stakeholders via aws SQS  about the completion of the 
     deployment process, providing relevant information and status updates.

#### `Benefits of Scanner-Sonar Infrastructure:`

  - `Automated Scanning:` The infrastructure automates the scanning process, reducing manual effort and enabling continuous 
     code quality monitoring.
  - `Scalability and Reliability:` Leveraging Kafka, AWS S3, and SQS, the infrastructure ensures scalability, reliability, and 
     high availability, even under heavy scanning workloads.
  - `Real-time Visibility:` By publishing scanning events to Kafka, the infrastructure provides real-time visibility into 
    scanning progress and status, enabling stakeholders to track scans closely.
  - `Enhanced Code Quality:` With its streamlined scanning workflow, the infrastructure helps organizations identify and 
    address code quality issues early in the development process, leading to higher-quality software products.


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
cd project-root && docker build -t scanner-sonar-infrastructure .
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
-e ORG_PROVIDER=sonarcloud \
-e ORG_NAME=devnet \
-e ORG_PROJECT_KEY=devnet_yeasinscan \
-e ORG_HOST=https://sonarcloud.io \
-e ACCESS_TOKEN= \
 scanner-sonar-infrastructure bash
```

```
ORG_PROVIDER=sonarcloud // don't change
ORG_NAME=devnet // sonar cloud org name thats you created
ORG_PROJECT_KEY=devnet_yeasinscan // sonar cloud org project key thats you created
ORG_HOST=https://sonarcloud.io  //don't change
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
- Give task name like scanner-infrastructure-sonar-task
- Choose 5 GB memory in infrastructure requirements section
- Remove http 80 port from port mapping in container-1 section
- Give image Url(copy sonar scanner image url from ECR) and name    (scanner-infrastructure-sonar) in container-1 section
- Click Create

`NB:` cluster and task definitions name has mensioned on scanner consumer server.


In conclusion, the Scanner-Sonar Infrastructure represents a paradigm shift in code quality management, offering advanced capabilities and unparalleled efficiency. By leveraging Node.js, Sonar CLI, Kafka, AWS  SQS, the infrastructure automates the scanning process, streamlining code quality monitoring and reporting. As organizations strive to prioritize code quality and deliver high-quality software products to users, investing in
