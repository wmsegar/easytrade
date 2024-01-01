FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

RUN apk add --no-cache icu-libs

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["easyTradeLoginService.csproj", "easyTradeLoginService/"]
RUN dotnet restore "easyTradeLoginService/easyTradeLoginService.csproj"
COPY . /src/easyTradeLoginService/
WORKDIR "/src/easyTradeLoginService"
RUN dotnet build "easyTradeLoginService.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "easyTradeLoginService.csproj" -c Release -o /app/publish
RUN dotnet test /app/publish/easyTradeLoginService.dll

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_ENVIRONMENT=Development
ENTRYPOINT ["dotnet", "easyTradeLoginService.dll"]
