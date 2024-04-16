# Mystical Proxy server

In the landscape of modern web development, optimizing frontend web application delivery is essential for providing users with a seamless experience. The Dynamic Reverse Proxy Server, built on Node.js, Redis, and other necessary tools, serves as a central component in this endeavor. When a client enters a URL in their web browser to access their frontend web app, this server captures the request, parses the URL to extract the subdomain, and then fetches information from the database to determine if a live web app exists for that subdomain. If found, it constructs a dynamic URL to load the web app from the appropriate production server hosted on AWS S3. In case of errors, the server publishes error messages to the system logs server via Redis or writes them to a default logger.

#### `Understanding Reverse Proxy Servers:`
Reverse Proxy Servers play a crucial role in web application delivery by serving as intermediaries between clients and backend servers. They enhance security, scalability, and performance by offloading tasks such as SSL termination, caching, and load balancing from backend servers.

#### `Key Components and Functionality:`

  - `Request Parsing:` Upon receiving a request, the reverse proxy server captures and parses the URL to extract the subdomain.

  - `Database Query:` Using the extracted subdomain, the server queries the database to find a web app with the 
     corresponding project ID, status set to 'live' and stage set to 'deploy'.

  - `Dynamic URL Construction:` If a live web app is found in the database, the server constructs a dynamic URL using the 
     project ID and version to load the web app from the appropriate production server hosted on AWS S3.

  - `Error Handling:` In case of any errors during request processing or database querying, the server publishes error messages 
     to the system logs server via Redis. If publishing to Redis fails, the server resorts to writing error messages to a 
     default logger.

  - `404 Page Handling:` If no live web app is found for the specified subdomain, the server returns a 404 page to the 
       client, indicating that the requested resource could not be found.


#### `Implementation:`

  - `Node.js:` Utilized for building a fast and scalable reverse proxy server that can efficiently handle incoming requests.
    
  - `Redis:` Employed as a reliable message broker for publishing error messages to the system logs server.
    
  - `Database (PostgreSQL):` Used to store information about live web apps, including project ID, version, status and stage in 
     projectstages table.

  - `AWS S3:` Serves as the hosting platform for production web apps.

`NOTE: For educational purposes, the current setup focuses on simplicity, merely loading the client's web application.`

`check issue: https://github.com/YeasinSE/Mystical-STD/issues/1`


### Follow the instruction step by step
Before go to step you should be install node in your system. i used node 20.x version.


#### Step 1: Define the REDIS path in .env file
```
REDIS_URL=
```

#### Step 2: Move project root and Install dependency
```sh
cd project-root && npm install
```

#### Step 3: Run server
```sh
npm start
```

Through the prowess of Node.js, Redis, and a curated arsenal of tools, the Dynamic Reverse Proxy Server empowers users with seamless access to their frontend web applications. With a ballet of request parsing, database querying, and dynamic URL construction, this server is the beacon guiding users to their digital destinations. As a linchpin in the web architecture tapestry, it elevates web application delivery, ushering in a new era of user-centric experiences.
