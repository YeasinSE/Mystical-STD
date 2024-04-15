# Mystical scanner infrastructure

In the digital age, safeguarding web applications against security threats is paramount for ensuring data integrity and user trust. The Scanner-Mystical Infrastructure, built with Node.js, Bearer CLI, Kafka, AWS S3, SQS, and Redis, stands as a groundbreaking solution designed to fortify web app security. This infrastructure not only automates scanning tasks but also provides real-time notifications and efficient error handling capabilities. In this infrastructure, we'll delve into the architecture, functionalities, and benefits of the Scanner-Mystical Infrastructure, demonstrating how it enhances web app security to unprecedented levels.


#### `The Importance of Web App Security:`
With web applications becoming increasingly complex, they are susceptible to various security vulnerabilities such as cross-site scripting (XSS), injection attacks, and data breaches. Protecting web applications against these threats is essential for maintaining data confidentiality, integrity, and availability. Static code analysis tools play a crucial role in identifying vulnerabilities and ensuring compliance with security best practices.

#### `Introducing the Scanner-Mystical Infrastructure:`
The Scanner-Mystical Infrastructure represents a comprehensive security management platform crafted with Node.js, Bearer CLI, Kafka, AWS S3, SQS, and Redis. It automates web app scanning tasks, provides real-time notifications, and facilitates efficient error handling. Leveraging Bearer CLI for static code analysis, Kafka for event-driven communication, AWS S3 for artifact storage, SQS for queuing and notification management, and Redis for asynchronous error handling, this infrastructure offers organizations a robust and scalable solution for web app security management.

#### `Key Components and Functionality:`

  - `Node.js Backend:` The Scanner-Mystical Infrastructure features a resilient Node.js backend responsible for handling 
    scanning requests, orchestrating scanning tasks, and managing communication with other components. Its modular 
    architecture enables seamless integration with existing development workflows.

  - `Bearer CLI Integration:` Bearer CLI serves as the core tool for conducting static code analysis on web app codebases. It 
     identifies security vulnerabilities, compliance issues, and other risks, allowing organizations to fortify their web app 
     security posture.

  - `Kafka Event Bus:` Kafka acts as the central communication hub within the infrastructure, facilitating real-time exchange 
     of scanning events and messages. Leveraging Kafka's distributed messaging architecture, the infrastructure ensures 
     reliable and scalable communication.

  - `AWS S3 Integration:` AWS S3 provides reliable and scalable object storage for storing scan reports and artifacts. The 
     infrastructure leverages S3 to store scan reports securely and access them during the scanning process.

  - `AWS SQS Integration:` AWS SQS enables efficient queuing and notification management. The infrastructure produces scanning 
     requests as messages in SQS queues, ensuring reliable delivery of scanning requests and notifications.

  - `Redis for Asynchronous Error Handling:` Redis is utilized for asynchronous error handling, allowing the infrastructure to 
     efficiently handle system errors and ensure minimal downtime during scanning processes.

#### `Scanning Workflow:`

  - `Triggering Scanning Requests:` The Scanner Consumer Server initiates scanning requests for web applications, triggering 
     the Scanner-Mystical Infrastructure to commence the scanning process.

   - `Orchestrating the Scanning Process:` Upon receiving a scanning request, the infrastructure orchestrates the scanning 
     process, invoking Bearer CLI to perform static code analysis on web application codebases.

  - `Analyzing Security Vulnerabilities:` Bearer CLI conducts comprehensive scanning of web application projects, identifying 
     security vulnerabilities, compliance issues, and other risks present in the code.

  - `Storing Scan Reports:` Once the scanning process is complete, the infrastructure stores the generated scan reports in 
      AWS S3 buckets in JSON format, ensuring accessibility and integrity of the reports.

   - `Publishing Scanning Events:` Throughout the scanning process, the infrastructure publishes scanning events and messages 
    to Kafka topics, providing real-time visibility into scanning progress and status.

  - `Notifying Via AWS SQS:` Finally, the infrastructure notifies stakeholders via aws SQS about the completion of the 
     scanning process, providing relevant information and status updates.

  - `Asynchronous Error Handling:` In the event of system errors during the scanning process, Redis is utilized for 
    asynchronous error handling. Error messages are published to Redis using the publish/subscribe (Pub/Sub) model, allowing 
    for efficient error resolution and minimal disruption to scanning processes.

#### `Benefits of Scanner-Mystical Infrastructure:`

  - `Automated Web Application Scanning:` The infrastructure automates scanning tasks, reducing manual effort and enabling 
     rapid identification of security vulnerabilities.

    - `NOTE: Currently scanning process task start via trigger from deployer consumer server based on client request via api 
    server. fully automation not support now.`
    
  - `Scalability and Reliability:` Leveraging AWS services such as S3 and SQS, the infrastructure ensures scalability, 
     reliability, and high availability, even under heavy scanning workloads.

  - `Real-time Visibility:` Leveraging Kafka, the infrastructure ensures real-time exchange of scanning events and messages, 
     providing stakeholders with instant visibility into scanning progress.

  - `Efficient Notification Management:` AWS SQS enables efficient queuing and notification management, ensuring reliable 
     delivery of scanning status updates and reports.

  - `Enhanced Web Application Security:` With its streamlined scanning workflow and notification management, the 
     infrastructure helps organizations identify and address web application vulnerabilities effectively, reducing the risk of 
      security breaches and data leaks.
    
  - `Enhanced Code Quality:` With its streamlined scanning workflow, the infrastructure helps organizations identify and 
     address code quality issues early in the development process, leading to higher-quality software products.
    
  - `Efficient Error Handling:` Utilizing Redis for asynchronous error handling ensures timely resolution of system errors and 
     minimizes downtime during scanning processes.


`NB:  Mystcial infrastructure internaly use bearer cli for scanning project and Are you confirm enabled kafka server and create an bucket name 'mystical-app-report' in s3.`

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


In conclusion, the Scanner-Mystical Infrastructure represents a significant advancement in web app security management. By leveraging Node.js, Bearer CLI, Kafka, AWS S3, SQS, and Redis, the infrastructure automates scanning tasks, provides real-time notifications, and facilitates efficient error handling. As organizations prioritize web app security in an increasingly digital landscape, investing in the Scanner-Mystical Infrastructure becomes essential for safeguarding sensitive data, preserving brand reputation, and maintaining regulatory compliance.
