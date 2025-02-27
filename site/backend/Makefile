postgres:
	docker compose up -d

createdb:
	docker exec -it api_gateway_db_postgres createdb --username=postgres --owner=postgres api_gateway_db

dropdb:
	docker exec -it api_gateway_db_postgres dropdb --username=postgres api_gateway_db

migrateup:
	migrate -path internal/migration -database "postgresql://postgres:changeme@localhost:5436/api_gateway_db?sslmode=disable" -verbose up

migratedown:
	migrate -path internal/migration -database "postgresql://postgres:changeme@localhost:5436/api_gateway_db?sslmode=disable" -verbose down

.PHONY: postgres createdb dropdb migrateup migratedown