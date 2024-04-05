FROM ubuntu:latest


RUN apt-get update
RUN apt-get install -y apt-transport-https
RUN apt-get install -y ca-certificates && update-ca-certificates
RUN echo "deb [trusted=yes] https://apt.fury.io/bearer/ /" | tee -a /etc/apt/sources.list.d/fury.list
RUN apt-get update
RUN apt-get install -y bearer
RUN apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs
RUN apt-get install -y git


WORKDIR /home/app

COPY application ./application
COPY .env .env
COPY infrastructure.sh infrastructure.sh
COPY infrastructure.js infrastructure.js
COPY ca.pem ca.pem


RUN chmod +x infrastructure.sh
RUN chmod +x infrastructure.js


COPY package*.json .

RUN npm install


ENTRYPOINT [ "/home/app/infrastructure.sh" ]