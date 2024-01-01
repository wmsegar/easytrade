FROM mcr.microsoft.com/dotnet/sdk:6.0 as build
WORKDIR /BrokerService
COPY BrokerService/ ./

RUN dotnet test test/BrokerService.test.csproj
RUN dotnet publish src/BrokerService.csproj -o /publish

FROM mcr.microsoft.com/dotnet/aspnet:6.0 as runtime
WORKDIR /publish
COPY --from=build /publish .
EXPOSE 80 443

ENV ASPNETCORE_ENVIRONMENT=Development

ENTRYPOINT ["dotnet", "BrokerService.dll"]