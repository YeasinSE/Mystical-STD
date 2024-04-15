# Mystical Bearer infrastructure

In today's digital landscape, securing web applications is crucial for safeguarding sensitive data and ensuring user trust. The Scanner-Bearer Infrastructure, built with Node.js, Bearer CLI, Kafka, and AWS SQS, emerges as a revolutionary solution designed to fortify web app security. This infrastructure not only automates scanning tasks but also facilitates seamless communication and notification management. In this service, we'll explore the architecture, functionalities, and benefits of the Scanner-Bearer Infrastructure, showcasing how it elevates front-end web app security to new heights.

#### `The Importance of Web App Security:`
web applications serve as the primary interface for users to interact with online services. As such, they are prime targets for security threats such as cross-site scripting (XSS), injection attacks, and data breaches. Ensuring the security of front-end codebases is essential for protecting user data, maintaining compliance, and preserving brand reputation.

#### `Introducing the Scanner-Bearer Infrastructure:`
The Scanner-Bearer Infrastructure is a comprehensive security management platform crafted with Node.js, Bearer CLI, Kafka, and AWS SQS. It automates front-end web app scanning tasks, facilitates seamless communication, and streamlines notification management. Leveraging Bearer CLI for static code analysis, Kafka for real-time communication, and AWS SQS for queuing and notification management, this infrastructure provides organizations with a robust and scalable solution for web app security management.

#### `Key Components and Functionality:`

  - `Node.js Backend:` The Scanner-Bearer Infrastructure features a resilient Node.js backend responsible for handling 
     scanning requests, orchestrating scanning tasks, and managing communication with other components. Its modular 
     architecture enables seamless integration with existing development workflows.

  - `Bearer CLI Integration:` Bearer CLI serves as the core tool for conducting static code analysis on web app 
     codebases. It identifies security vulnerabilities, compliance issues, and other risks, allowing organizations to fortify 
     their web app security posture.

  - `Kafka Event Bus:` Kafka acts as the central communication hub within the infrastructure, facilitating real-time exchange 
     of scanning events and messages. By leveraging Kafka's distributed messaging architecture, the infrastructure ensures 
     reliable and scalable communication.
    
  - `AWS SQS Integration:` AWS SQS enables efficient queuing and notification management. The infrastructure produces scanning 
     requests as messages in SQS queues, ensuring reliable delivery of scanning requests and notifications.

#### `Scanning Workflow:`

  - `Triggering Scanning Requests:` The Scanner Consumer Server initiates scanning requests for web applications, 
     triggering the Scanner-Bearer Infrastructure to commence the scanning process.

  - `Orchestrating the Scanning Process:` Upon receiving a scanning request, the infrastructure orchestrates the scanning 
     process, invoking Bearer CLI to perform static code analysis on web app codebases.

  - `Analyzing Security Vulnerabilities:` Bearer CLI conducts comprehensive scanning of web app projects,  
     identifying security vulnerabilities, compliance issues, and other risks present in the code.

  - `Generating Security Reports:` Once the scanning process is complete, Bearer CLI generates detailed security reports    
     outlining detected vulnerabilities and providing actionable recommendations for remediation.
    
  - `Sending Reports to Bearer Cloud:` The infrastructure securely sends the generated security reports to Bearer Cloud, where 
     they are aggregated and made accessible for further analysis and action.

  - `Publishing Scanning Events:` Throughout the scanning process, the infrastructure publishes scanning events and messages 
     to Kafka topics, offering real-time visibility into scanning progress and status.
    
  - `Notifying Via AWS SQS:` Finally, the infrastructure notifies stakeholders via aws SQS about the completion of the 
     scanning process, providing relevant information and status updates.
    
  - `Error Handling with Redis Pub/Sub:` In the event of system errors during scanning, the infrastructure publishes error 
     messages to Redis using the publish/subscribe (Pub/Sub) model. This allows for efficient error handling and 
     troubleshooting, ensuring timely resolution of deployment issues.


#### `Notification Management:`

  - The infrastructure utilizes AWS SQS for efficient notification management, providing real-time updates on scanning status 
     and results.
  - Stakeholders receive notifications via preferred channels such as email or messaging platforms, ensuring timely awareness 
    of security status and issues.

#### `Benefits of Scanner-Bearer Infrastructure:`

  - `Automated Web Application Scanning:` The infrastructure automates scanning tasks, reducing manual effort and enabling 
      continuous security monitoring.

    - `NOTE:Currently Scanning process task start via trigger from scanner consumer server based on client request via api 
      server. fully automation not support now.`
 
  - `Scalability and Reliability:` Leveraging Kafka and AWS SQS, the infrastructure ensures scalability, reliability, and high 
     availability, even under heavy scanning workloads.
    
  - `Real-Time Communication:` Leveraging Kafka, the infrastructure ensures real-time exchange of 
     scanning events and messages, providing stakeholders with instant visibility into scanning progress.

  - `Efficient Notification Management:` AWS SQS enables efficient queuing and notification management, ensuring reliable 
     delivery of scanning status updates and reports.
    
  - `Enhanced Web Application Security:` With its streamlined scanning workflow and notification management, the 
    infrastructure helps organizations identify and address web app vulnerabilities effectively, reducing the risk 
    of security breaches and data leaks.

  - `Enhanced Code Quality:` With its streamlined scanning workflow, the infrastructure helps organizations identify and 
    address code quality issues early in the development process, leading to higher-quality software products.
    
  - `Efficient Error Handling:` Using Redis Pub/Sub, the infrastructure facilitates efficient error handling and 
     troubleshooting, minimizing deployment downtime and ensuring seamless delivery of web applications.


`Note:` Mystical Bearer infrastructure was not tested now. if any one have bearer cloud access you can test this infrastructure OR you can share credential with me.


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

In conclusion, the Scanner-Bearer Infrastructure represents a significant advancement in web app security management. By leveraging Node.js, Bearer CLI, Kafka, and AWS SQS, the infrastructure automates scanning tasks, facilitates seamless communication, and streamlines notification management. As organizations prioritize front-end web app security, investing in the Scanner-Bearer Infrastructure becomes essential for safeguarding user data, maintaining compliance, and preserving brand reputation in today's digital landscape.

