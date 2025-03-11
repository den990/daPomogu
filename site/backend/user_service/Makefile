postgres:
	docker compose up -d

createdb:
	docker exec -it db_user_service createdb --username=postgres --owner=postgres dapomogu

dropdb:
	docker exec -it db_user_service dropdb --username=postgres dapomogu

migrateup:
	migrate -path internal/migrations -database "postgresql://postgres:dapomogu_password@localhost:5436/dapomogu?sslmode=disable" -verbose up

migratedown:
	migrate -path internal/migrations -database "postgresql://postgres:dapomogu_password@localhost:5436/dapomogu?sslmode=disable" -verbose down

.PHONY: postgres createdb dropdb migrateup mexigratedown