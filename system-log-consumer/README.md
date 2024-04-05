# Mystical System log consumer server

Handle all incomming system log(exception etc) thats come from redis server and store log into mongoDB cloud. Are you confirm create an 'system-logs' table in mongoDB cloud and enabled redis server.


### Follow the instruction step by step
Before go to step you should be install node in your system and. i used node 20.x version.


#### Step 1: Set the mongoDB information in .env file
```
MONGO_DB=mystical
MONGO_LOG_TABLE=system-logs
MOGO_URL=mongodb+srv://username:passsword@mystical-std.jyqkmzb.mongodb.net/?retryWrites=true&w=majority&appName=mystical-std

```

#### Step 2: Define the REDIS path and Topic name in .env file
```
SYSTEM_LOG_CONTAINER=systemlogs // topic name
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