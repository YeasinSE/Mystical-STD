# Mystical scanner consumer server

In the dynamic landscape of software development, ensuring the security and quality of code is paramount. Project scanning tools play a crucial role in identifying vulnerabilities, ensuring compliance, and improving code quality. However, managing scanning tasks across diverse infrastructure and scanner providers can be challenging. Enter the Scanner Consumer Server—a robust solution designed to consume project scanning requests from AWS SQS, execute scanner tasks on AWS ECS, and deliver comprehensive scanning results. In this Service, we explore the significance of a Scanner Consumer Server and its role in streamlining project scanning operations.

#### `The Imperative of Application Security:`
With cyber threats evolving rapidly, organizations must prioritize application security to safeguard sensitive data and protect against malicious attacks. Conducting regular vulnerability scans is essential for identifying and mitigating security risks, ensuring the integrity and reliability of web applications.

#### `The Importance of Effective Project Scanning:`
As software projects grow in complexity, so do the challenges associated with ensuring their security and quality. Project scanning tools, including static code analyzers, vulnerability scanners, and compliance checkers, help developers identify issues early in the development lifecycle. By integrating scanning into the development process, organizations can mitigate risks, reduce security vulnerabilities, and deliver high-quality software products.

#### `Introducing the Scanner Consumer Server:`
The Scanner Consumer Server serves as a central component of scanning infrastructure, facilitating the execution of scanning tasks across different scanner providers and infrastructure components. By consuming project scanning requests from AWS SQS, the consumer server orchestrates the execution of scanner tasks on AWS ECS—a scalable container orchestration service. It dynamically provisions scanning containers based on requested scanner providers, executes scanning tasks, delivers scanning results to clients and managing errors effectively. Leveraging Node.js, AWS ECS, SQS, and Redis, this server empowers organizations to conduct comprehensive security assessments, identify vulnerabilities, and mitigate risks proactively.

#### `Key Components and Functionality:`

   - `Node.js Backend:` The Scanner-Consumer Server features a resilient Node.js backend responsible for handling API 
      requests,  communicating with AWS ECS, and managing error handling with Redis. Its asynchronous architecture enables 
      concurrent processing of scanning tasks, ensuring optimal performance and scalability.

   - `AWS ECS Integration:` Integrated with AWS ECS, the server executes scanning tasks in containerized environments. It 
     interacts with ECS to schedule and manage task execution, ensuring scalability, reliability, and efficient resource 
     utilization.

   - `AWS SQS Integration:` AWS SQS serves as the message queue for scanning messages. The Scanner-Consumer Server consumes 
     messages from SQS queues, ensuring reliable message delivery and decoupling the API server from the scanning process. SQS 
     enhances fault tolerance and scalability by facilitating asynchronous message processing.

   - `Redis for Asynchronous Error Handling:` Redis plays a pivotal role in handling system errors asynchronously. In the 
      event of errors such as message consumption failures or task execution errors, the server publishes error messages to 
      Redis. This enables asynchronous error handling, ensuring timely resolution and minimal disruption to the scanning 
      pipeline.


#### `Scanning Workflow:`
 When a client submits a scanning request via the API, the Scanner-Consumer Server validates the request parameters and 
 enqueues a scanning message in the AWS SQS scanner queue. then this consumer start process below Workflow:

  - `Consuming Scanning Messages:` The server continuously polls the SQS queue for new scanning messages. Upon receiving a 
     message, it initiates an ECS task to conduct the vulnerability assessment.

  - `Executing ECS Task:` The Scanner-Consumer Server communicates with AWS ECS to schedule and execute the scanning task. 
     This task involves analyzing the web application for security vulnerabilities and generating a comprehensive report.

  - `Asynchronous Error Handling with Redis:` If system errors occur during scanning, such as message consumption failures or 
     task execution errors, the server publishes error messages to Redis. Stakeholders can monitor error logs in real-time and 
     take corrective actions as needed, ensuring minimal disruption to the scanning pipeline.


#### `Benefits of Using a Scanner Consumer Server:`

  - `Centralized Scanning Orchestration:` Scanning tasks are orchestrated centrally, simplifying scanning management and   
     ensuring consistent execution across different scanner providers.
    
  - `Scalable Infrastructure:` By leveraging AWS ECS for task execution, the consumer server ensures scalability, reliability, 
     and high availability, even under heavy scanning workloads.
    
  -  `Dynamic Provisioning:` Scanner tasks are provisioned dynamically based on requested scanner providers, enabling 
     flexibility and optimization of scanning resources.
    
  - `Efficient Error Handling:` Asynchronous error handling with Redis ensures prompt resolution of system errors, minimizing 
     downtime and maintaining application security.



### Follow the instruction step by step
Before go to step you should be install node in your system. i used node 20.x version.


#### Step 1: Define the AWS credentials in .env file
```
AWS_ACCESS_KEY=
AWS_SECRET_KEY=
```

#### Step 2: Define the AWS ECS cluster and task information in .env file
NB: 'scanner-infrastructure-mystical-task' internaly used bearer cli
```
CLUSTER_NAME=arn:aws:ecs:us-east-1:accountId:cluster/mystical-infrastructure-cluster

TASK_DEFINITION_SONAR=arn:aws:ecs:us-east-1:accountId:task-definition/scanner-infrastructure-sonar-task

TASK_DEFINITION_MYSTICAL=arn:aws:ecs:us-east-1:accountId:task-definition/scanner-infrastructure-mystical-task

```

#### Step 3: Define the AWS ECR container information in .env file
```
CONTAINER_SONAR=scanner-sonar-infrastructure
CONTAINER_MYSTICAL=scanner-mystical-infrastructure

```

#### Step 4: Define the AWS deployer queue path in .env file
```
CONSUMER_QUEUE_URL=https://sqs.us-east-1.amazonaws.com/accountId/mystical-scanner-queue
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

In conclusion, the Scanner-Consumer Server plays a pivotal role in enhancing application security through efficient vulnerability scanning processes. By leveraging Node.js, AWS ECS, SQS, and Redis, organizations can conduct comprehensive security assessments, identify vulnerabilities, and mitigate risks effectively. As businesses prioritize cybersecurity and risk management, investing in the Scanner-Consumer Server becomes essential for safeguarding sensitive data and ensuring the integrity of web applications in today's threat landscape.
