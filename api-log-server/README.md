# Mystical Log Api Server

We can fetch all customer app logs information like scan, deploy etc via this api.


### Follow the instruction step by step
Before go to step you should be install node in your system. i used node 20.x version.

#### Step 1:  create an 'event_logs' table in AWS dyanamoDB

#### Step 2: Define aws credenticals in .env file
```
AWS_ACCESS_KEY=
AWS_SECRET_KEY=
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