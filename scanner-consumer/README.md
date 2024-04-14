# Mystical scanner consumer server

In the dynamic landscape of software development, ensuring the security and quality of code is paramount. Project scanning tools play a crucial role in identifying vulnerabilities, ensuring compliance, and improving code quality. However, managing scanning tasks across diverse infrastructure and scanner providers can be challenging. Enter the Scanner Consumer Server—a robust solution designed to consume project scanning requests from AWS SQS, execute scanner tasks on AWS ECS, and deliver comprehensive scanning results. In this Service, we explore the significance of a Scanner Consumer Server and its role in streamlining project scanning operations.

#### `The Importance of Effective Project Scanning:`
As software projects grow in complexity, so do the challenges associated with ensuring their security and quality. Project scanning tools, including static code analyzers, vulnerability scanners, and compliance checkers, help developers identify issues early in the development lifecycle. By integrating scanning into the development process, organizations can mitigate risks, reduce security vulnerabilities, and deliver high-quality software products.

#### `Introducing the Scanner Consumer Server:`
The Scanner Consumer Server serves as a central component of scanning infrastructure, facilitating the execution of scanning tasks across different scanner providers and infrastructure components. By consuming project scanning requests from AWS SQS, the consumer server orchestrates the execution of scanner tasks on AWS ECS—a scalable container orchestration service. It dynamically provisions scanning containers based on requested scanner providers, executes scanning tasks, and delivers scanning results to clients.

#### `Consuming Project Scanning Requests from AWS SQS:`
AWS SQS provides a reliable and scalable message queuing service, allowing the API server to produce project scanning requests as messages in SQS queues. The Scanner Consumer Server subscribes to designated SQS queues, fetching scanning requests in real-time as they are produced. By leveraging SQS's distributed messaging architecture, the consumer server ensures efficient and reliable delivery of scanning requests to the scanning infrastructure.

#### `Executing Scanner Tasks on AWS ECS:`
Once scanning requests are consumed from AWS SQS, the Scanner Consumer Server dynamically provisions scanning tasks on AWS ECS based on requested scanner providers. It launches scanning containers, configures scanner environments, and executes scanning tasks in isolated and scalable containerized environments. By leveraging ECS's capabilities for container management and orchestration, the consumer server ensures efficient and scalable execution of scanning tasks.

#### `Delivering Comprehensive Scanning Results:`
Upon completion of scanning tasks, the Scanner Consumer Server aggregates scanning results, including security vulnerabilities, code quality issues, and compliance violations. It delivers comprehensive scanning reports to clients via various communication channels, including email, API endpoints, or notification services. By providing detailed insights into scanning findings, the consumer server enables developers to take proactive measures to address identified issues and improve code quality.

#### `Benefits of Using a Scanner Consumer Server:`

  - `Centralized Scanning Orchestration:` Scanning tasks are orchestrated centrally, simplifying scanning management and   
     ensuring consistent execution across different scanner providers.
  - `Scalable Infrastructure:` By leveraging AWS ECS for task execution, the consumer server ensures scalability, reliability, 
     and high availability, even under heavy scanning workloads.
  -  `Dynamic Provisioning:` Scanner tasks are provisioned dynamically based on requested scanner providers, enabling 
     flexibility and optimization of scanning resources.
  - `Comprehensive Reporting:` Scanning results are delivered to clients in comprehensive reports, providing actionable 
    insights into code security, quality, and compliance.

NB: Bearer cloud not support currently and 'scanner-infrastructure-mystical-task' internaly used bearer cli


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
