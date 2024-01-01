FROM mcr.microsoft.com/mssql/server:2019-CU14-ubuntu-20.04

ENV ACCEPT_EULA Y

ENV MSSQL_PID Express

USER root

RUN mkdir -p /my-app

WORKDIR /my-app

COPY ./sql-scripts/ /my-app

EXPOSE 1433

ENTRYPOINT ./entrypoint.sh
