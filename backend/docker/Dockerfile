FROM maven:3.8.4-jdk-11

ADD ./deployments/ /

EXPOSE 8080

CMD ["java", "-jar", "/deployments/backend.jar"]
