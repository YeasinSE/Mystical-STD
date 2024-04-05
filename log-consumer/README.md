# Mystical log consumer server

Handle all incomming application log(scan, deploy log etc) thats come from kafka server and store log into dynamoDB. Are you confirm create an 'event_logs' table in AWS dynamoDB and enabled kafka server.


### Follow the instruction step by step
Before go to step you should be install node in your system and. i used node 20.x version.


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

#### Step 3: Define the REDIS path in .env file
```
REDIS_URL=
```

#### Step 4: Move project root and Install dependency
```sh
cd project-root && npm install
```

#### Step 5: Run server
```sh
npm start
```