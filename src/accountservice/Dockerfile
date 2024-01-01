FROM openjdk:11-jdk-slim as build

WORKDIR /src
# make gradlew download gradle files before copying source files to use caching
COPY build.gradle gradlew ./
COPY gradle gradle

COPY src /src/src

RUN ./gradlew bootJar

FROM openjdk:11-jdk-slim

RUN groupadd -r spring && useradd -r -g spring spring
USER spring:spring

COPY --from=build /src/build/libs/*.jar app.jar

ENTRYPOINT ["java","-jar","/app.jar"]