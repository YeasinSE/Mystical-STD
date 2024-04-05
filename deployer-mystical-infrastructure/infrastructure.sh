#!/bin/bash

if [ "$PROJECT_URL" = "" ]
then
  echo "Project url is missing!"
  exit;
fi

export PROJECT_URL="$PROJECT_URL"

git clone "$PROJECT_URL" /home/app/output

exec node infrastructure.js