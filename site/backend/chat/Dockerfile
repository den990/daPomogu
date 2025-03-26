FROM golang:1.23-alpine as builder

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod tidy

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o main ./chat/cmd

FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /app

COPY --from=builder /app/main .
COPY chat/config.yaml /app/config.yaml
COPY chat/migrations /app/migrations

RUN chmod +x ./main

EXPOSE 8080

CMD sh -c "./main --config=./config.yaml"
