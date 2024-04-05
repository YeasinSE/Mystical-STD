# Mystical Api Server

Customer can request for create, scan, deploy project etc via this api.


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