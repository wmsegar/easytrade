FROM openjdk:11-jdk-slim as build

WORKDIR /src
# make gradlew download gradle files before copying source files to use caching
COPY build.gradle gradlew ./
COPY gradle gradle
RUN ./gradlew --version

COPY src /src/src

RUN ./gradlew test --info
RUN ./gradlew fatJar

FROM openjdk:11-jdk-slim

COPY --from=build /src/build/libs/*-all.jar app.jar

COPY scripts/ /

ENTRYPOINT /run-process.sh
