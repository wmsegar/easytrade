FROM golang:1.19.5-bullseye as BUILD

WORKDIR builddir

COPY go.mod go.sum ./
RUN go mod tidy && go mod verify

COPY . .

RUN go test ./...

RUN go install github.com/swaggo/swag/cmd/swag@v1.8.12

RUN swag init

RUN go build -ldflags '-linkmode=external'

FROM ubuntu:20.04

ENV GIN_MODE=release

COPY --from=BUILD ./go/builddir/pricing-service .

CMD ["./pricing-service"]