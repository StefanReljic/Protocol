#!/bin/bash

# builds the whole app

docker run -it --rm -v \
	"$(pwd)":/usr/OptimusPrime \
	-e MAVEN_CONFIG=/var/maven/.m2 \
	-u $(id -u) \
	-v "${HOME}/.m2":/var/maven/.m2 \
	-w /usr/OptimusPrime maven:3.8.4-jdk-11 \
       	mvn -Duser.home=/var/maven clean package

mkdir -p backend/docker/appserver/deployments/
cp backend/target/backend.war backend/docker/appserver/deployments/.

cd backend
bash build.sh
