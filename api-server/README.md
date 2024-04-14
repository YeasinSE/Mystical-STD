# Mystical Api Server

An API server designed for project management, encompassing functions like project creation, scanning, deployment, and more, can significantly streamline the development workflow. Let's delve into the core features and workings of such a server:

####  Project Creation:
- Developers can initiate new projects by sending a POST request to the API server with essential project details such as name, key, domain, url, type  parameters.

#### `How Can Scanning Process Work:`
API server also designed to handle requests for scanning projects using Sonar and Bearer CLI, sending reports to Sonar and Bearer servers, along with integrating a mystical scanner that internally utilizes the Bearer CLI and sends reports to AWS S3:

- `Sonar and Bearer CLI Integration:`
  The API server receives requests to scan projects and triggers both Sonar and Bearer CLI tools to analyze the codebase simultaneously. Sonar CLI performs static code analysis 
  for code quality and security vulnerabilities, while Bearer CLI specializes in API security scanning and monitoring.
  
- `Sending Reports to Sonar and Bearer Servers:`
  After the scanning is completed by Sonar and Bearer CLI, the API server formats the scan reports and sends them to the respective Sonar and Bearer servers. Reports sent to 
  Sonar server include code quality metrics, issues, and recommendations, while reports sent to Bearer server focus on API vulnerabilities and usage patterns.
  
- `Mystical Scanner Integration:`
 The API server also integrates with a mystical scanner, a custom tool that internally utilizes the Bearer CLI for security scanning purposes. When a scanning request is 
 received specifically for the mystical scanner, the API server triggers the Bearer CLI internally and processes the scan results.

 Upon completion of the mystical scanner's analysis, the API server stores the scan reports in AWS S3. These reports are securely stored and can be accessed for further 
 analysis, auditing, or compliance purposes.

 
#### `How Can build and deploy Process Work:`
The API server receives requests to build and deploy a React project. These requests typically include information such as the project's source code repository location,   build configuration, and any additional parameters.

here's an outline of an API server that manages requests to build and deploy a React project to AWS S3:

  - `Project Build Process:`
  Upon receiving a build request, the API server triggers the build process for the React project. This process involves fetching the source code from the specified repository, 
  installing dependencies, and running the necessary build scripts (e.g., using npm or yarn).

  - `Monitoring and Logging:`
  Throughout the build process, the API server monitors the progress and logs relevant information such as build status, errors, and debugging messages. This helps in   
  troubleshooting and ensuring the build completes successfully.

  `Once the build process is complete, the React project generates build artifacts such as static HTML, CSS, and JavaScript files. These artifacts are essential for deploying 
  the React application to AWS S3.`
  
  - `AWS S3 Deployment Process:`
  The API server initiates the deployment process by uploading the build artifacts (e.g., HTML, CSS, JavaScript files) to the specified S3 bucket. It utilizes the AWS SDK or S3 API to securely transfer the files and ensure they are accessible over the web.
  
  - `Monitoring Deployment Status:`
  Throughout the deployment process, the API server monitors the status and logs relevant information such as upload progress, errors, and confirmation of successful deployment. This ensures visibility into the deployment process and facilitates troubleshooting if needed.






### Follow the instruction step by step
Before go to step you should be install node in your system. i used node 20.x version.


#### Step 1: Define the AWS credentials in .env file
```
AWS_ACCESS_KEY=
AWS_SECRET_KEY=
```

#### Step 2: Define the AWS SQS path in .env file
```
DEPLOYER_SQS_QUEUE_URL=https://sqs.us-east-1.amazonaws.com/accountId/mystical-deployer-queue
SCANNER_SQS_QUEUE_URL=https://sqs.us-east-1.amazonaws.com/accountId/mystical-scanner-queue
```

#### Step 3: Define the REDIS path in .env file
```
REDIS_URL=
```

#### Step 4: Define the database information in .env file
```
DB_NAME=mystical
DB_USER=postgres
DB_PASSWORD=postgres
DB_DIALECT=postgres
```

#### Step 5: Define your email in .env file
```
AUTHOR_EMAIL=
```

#### Step 6: Move project root and Install dependency
```sh
cd project-root && npm install
```

#### Step 7: Run server
```sh
npm start
```
