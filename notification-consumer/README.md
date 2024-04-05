# Mystical notification consumer server

Handle all notification request and process to send notification to client. 


### Follow the instruction step by step
Before go to step you should be install node in your system. i used node 20.x version.


#### Step 1: Define the AWS credentials in .env file
```
AWS_ACCESS_KEY=
AWS_SECRET_KEY=
```

#### Step 4: Define the AWS notification queue path in .env file
```
CONSUMER_QUEUE_URL=https://sqs.us-east-1.amazonaws.com/accountId/mystical-notification-queue
```

#### Step 5: Define the REDIS path in .env file
```
REDIS_URL=
```

#### Step 6: Define the smtp configuration in .env file
```
FROM_EMAIL=dev.solution@mystical.com

SMTP_MAIL_DRIVER=smtp
SMTP_MAIL_HOST=smtp.gmail.com
SMTP_MAIL_PORT=587
SMTP_MAIL_USERNAME=
SMTP_MAIL_PASSWORD=
SMTP_MAIL_ENCRYPTION=tls
```

#### Step 7: Move project root and Install dependency
```sh
cd project-root && npm install
```

#### Step 8: Run server
```sh
npm start
```