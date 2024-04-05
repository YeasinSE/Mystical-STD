#!/bin/bash

export PROJECT_URL="$PROJECT_URL"

git clone "$PROJECT_URL" /home/app/output

exec node infrastructure.js