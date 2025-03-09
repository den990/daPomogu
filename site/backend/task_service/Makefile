docker:
	docker compose up -d

createdb:
	docker exec -it db_task_service createdb --username=postgres --owner=postgres dapomogu_task_db

dropdb:
	docker exec -it db_task_service dropdb --username=postgres dapomogu_task_db

migrateup:
	migrate -path migrations -database "postgresql://postgres:dapomogu_password@localhost:5435/dapomogu_task_db?sslmode=disable" -verbose up

migratedown:
	migrate -path migrations -database "postgresql://postgres:dapomogu_password@localhost:5435/dapomogu_task_db?sslmode=disable" -verbose down

.PHONY: postgres createdb dropdb migrateup migratedown