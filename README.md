# easytrade

A project consisting of many small services that connect to each other.

## Docker compose instructions

To use it you need to have:

- Docker with minimal version **v20.10.13**
  - you can follow [this](https://docs.docker.com/engine/install/ubuntu/) guide to update Docker
  - this guide also covers installing Docker Compose Plugin
- Docker Compose Plugin
  ```bash
  sudo apt update
  sudo apt install docker-compose-plugin
  ```
  - more information in [this](https://docs.docker.com/compose/install/linux/) guide

With this you can run

```bash
docker compose up
# or to run in the background
docker compose up -d
```

## Local build instructions

If you are going to build stuff when the local changes are not commited, then I suggest changing the skaffold config to have this param:

```yaml
tagPolicy:
  gitCommit:
    ignoreChanges: true
```

If you don't add it, you will see some images with 'tag-dirty'. Just saying :P

Build & run instructions:

```bash
# first build all images
skaffold build -d gcr.io/dynatrace-demoability/easytrade -t latest

# check the new build tag with
docker images

# start the containers with one of
docker compose up
docker compose up -d

# stop the execution wth CTRL+C if you did not use '-d' option

# stop & remove the containers with
docker compose down
```

## Endpoints accessible through reverse proxy

### Port 80

| Endpoint                     | Service                |
| ---------------------------- | ---------------------- |
| `/`                          | Frontend               |
| `/accountservice`            | AccountService         |
| `/broker-service`            | BrokerService          |
| `/credit-card-order-service` | CreditCardOrderService |
| `/engine`                    | Engine                 |
| `/feature-flag-service`      | FeatureFlagService     |
| `/loginservice`              | LoginService           |
| `/manager`                   | Manager                |
| `/offerservice`              | OfferService           |
| `/pricing-service`           | PricingService         |
| `/third-party-service`       | ThirdPartyService      |

## Endpoints available when deployed with `compose.dev.yaml`

After starting the docker compose you will be able to visit the folowing services:

- localhost -> a working properly react frontend
- localhost:1433 -> can be used to connect to the DB
- localhost:8081/swagger -> Manager - has direct access to DB and exposes many REST endpoints to communicated with the DB.
  localhost/manager/swagger
- localhost:8082 -> RabbitMQ managment site. The credentials are userxxx/passxxx by default.
- localhost:8083/swagger/index.html -> Pricing service swagger endpoints
  localhost/pricing-service/swagger/index.html
- localhost:8084/swagger -> Broker service swagger endpoints  
  localhost/broker-service/swagger
- localhost:8086/swagger -> Login service swagger endpoints  
  localhost/loginservice/swagger
- localhost:8087 -> Offer service. The endpoints can be found in project's README file
- localhost:8089/api/swagger-ui/ -> Account service swagger endpoint  
  localhost/accountservice/api/swagger-ui/
- localhost:8090/api/swagger-ui/ -> Engine swagger endpoint  
  localhost/engine/api/swagger-ui/
- localhost:8091/swagger-ui/index.html -> Credit card order service swagger endpoint  
  localhost/credit-card-order-service/swagger-ui/index.html
- localhost:8093/swagger-ui/index.html -> Third party service swagger endpoint
  localhost/third-party-service/swagger-ui/index.html
- localhost:8094/swagger-ui/index.html -> Feature flag service swagger endpoint  
  localhost/feature-flag-service/swagger-ui/index.html

Don't use this service:

- localhost:8092 -> in docker dev mode this should be the frontend

## Body types

EasyTrade network trafic is handled by REST requests using mostly JSON payloads. However, some of the services
can also handle XML requests. Data types are negotiated based on `Accept` and `Content-Type` headers.

#### XML compatible services

| Service                                                             | Accepted XML MIME types                            | Endpoints called with XML as default content type   |
| ------------------------------------------------------------------- | -------------------------------------------------- | --------------------------------------------------- |
| [LoginService](./src/loginservice/easyTradeLoginService/README.md)  | `application/xml`; `text/xml`; `application/*+xml` | `/v1/orders/{id}/status/latest`                     |
| [CreditCardOrderService](./src/credit-card-order-service/README.md) | `application/xml`                                  | `/api/Login`; `/api/Logout`; `/api/Signup`          |
| [OfferService](./src/offerservice/README.md)                        | `application/xml`; `text/xml`                      | `/v1/prices/instrument/{instrumentId}`              |
| [PricingService](./src/pricing-service/README.md)                   | `application/xml`                                  | `/api/offers/{id}` (called from Aggregator Service) |

## Deploy EasyTrade with external MSSQL database

### With Docker compose

Modify DB connection strings in [compose.yaml](./compose.yaml).
Replace `{HOST}`, `{PORT}`, `{USER}` and `{PASSWORD}` with your external database data.

```yaml
x-connection-strings:
  JAVA_CONNECTION_STRING: &java-connection-string jdbc:sqlserver://{HOST}:{PORT};database=TradeManagement;user={USER};password={PASSWORD};encrypt=false;trustServerCertificate=false;loginTimeout=30;
  DOTNET_CONNECTION_STRING: &dotnet-connection-string Data Source={HOST},{PORT};Initial Catalog=TradeManagement;Persist Security Info=True;User ID={USER};Password={PASSWORD};TrustServerCertificate=true
  GO_CONNECTION_STRING: &go-connection-string sqlserver://{USER}:{PASSWORD}@{HOST}:{PORT}?database=TradeManagement&connection+encrypt=false&connection+TrustServerCertificate=false&connection+loginTimeout=30
```

To disable default MSSQL container, remove `db` service from [compose.yaml](./compose.yaml).

### With k8s manifests

Modify DB connection string in ConfigMap in [connection-strings.yaml](./kubernetes-manifests/connection-strings.yaml).
Replace `{HOST}`, `{PORT}`, `{USER}` and `{PASSWORD}` with your external database data.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: connection-strings
data:
  JAVA_CONNECTION_STRING: jdbc:sqlserver://{HOST}:{PORT};database=TradeManagement;user={USER};password={PASSWORD};encrypt=false;trustServerCertificate=false;loginTimeout=30;
  DOTNET_CONNECTION_STRING: Data Source={HOST},{PORT};Initial Catalog=TradeManagement;Persist Security Info=True;User ID={USER};Password={PASSWORD};TrustServerCertificate=true
  GO_CONNECTION_STRING: sqlserver://{USER}:{PASSWORD}@{HOST}:{PORT}?database=TradeManagement&connection+encrypt=false&connection+TrustServerCertificate=false&connection+loginTimeout=30
```

To disable default MSSQL container, delete the [db.yaml](./kubernetes-manifests/db.yaml) file.
