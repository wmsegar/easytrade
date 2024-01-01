FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

RUN apk add --no-cache icu-libs

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["easyTradeManager.csproj", "easyTradeManager/"]
RUN dotnet restore "easyTradeManager/easyTradeManager.csproj"
COPY . /src/easyTradeManager/
WORKDIR "/src/easyTradeManager"
RUN dotnet build "easyTradeManager.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "easyTradeManager.csproj" -c Release -o /app/publish
RUN dotnet test /app/publish/easyTradeManager.dll

FROM base AS final
WORKDIR /app

COPY --from=publish /app/publish .

ENV ASPNETCORE_ENVIRONMENT=Development

CMD ["dotnet", "easyTradeManager.dll"]
