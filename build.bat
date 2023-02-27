docker run -it --rm -v %cd%:/usr/OptimusPrime -v %userprofile%\.m2:/root/.m2 -w /usr/OptimusPrime maven:3.8.4-jdk-11 mvn clean package

mkdir backend\docker\appserver\deployments
copy backend\target\backend.jar backend\docker\appserver\deployments

cd backend
build.bat %*
