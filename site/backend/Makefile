postgres:
	docker compose up -d

createdb:
	docker exec -it db_dapomogu createdb --username=postgres --owner=postgres dapomogu

dropdb:
	docker exec -it db_dapomogu dropdb --username=postgres dapomogu

migrateup:
	migrate -path internal/migration -database "postgresql://postgres:dapomogu_password@localhost:5436/dapomogu?sslmode=disable" -verbose up

migratedown:
	migrate -path internal/migration -database "postgresql://postgres:dapomogu_password@localhost:5436/dapomogu?sslmode=disable" -verbose down

.PHONY: postgres createdb dropdb migrateup mexigratedown