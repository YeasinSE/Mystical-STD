#!/bin/bash

# if [ ! -f ".env" ]
# then
#   echo "Creating .env -- update it with your API key!"
#   cp .env.local .env
# fi

export PROJECT_URL="$PROJECT_URL"
export SONAR_SCANNER_VERSION="5.0.1.3006"
export SONAR_SCANNER_HOME="$HOME/.sonar/sonar-scanner-$SONAR_SCANNER_VERSION-linux"

curl --create-dirs -sSLo $HOME/.sonar/sonar-scanner.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-$SONAR_SCANNER_VERSION-linux.zip
unzip -o $HOME/.sonar/sonar-scanner.zip -d $HOME/.sonar/
rm -rf $HOME/.sonar/sonar-scanner.zip

export PATH="$SONAR_SCANNER_HOME/bin:$PATH"
export SONAR_SCANNER_OPTS="-server"
# export SONAR_SCANNER_OPTS="-Xmx512m"
# node --version
# npm --version

git clone "$PROJECT_URL" /home/app/output

exec node infrastructure.js