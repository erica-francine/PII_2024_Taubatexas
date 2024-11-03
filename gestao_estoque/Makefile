# Makefile usando `docker compose`

COMPOSE_FILE = docker-compose.yml

build:
	docker compose -f $(COMPOSE_FILE) build

up: build
	docker compose -f $(COMPOSE_FILE) up -d

stop:
	docker compose -f $(COMPOSE_FILE) stop

down: stop
	docker compose -f $(COMPOSE_FILE) down

logs:
	docker compose -f $(COMPOSE_FILE) logs -f

build-compose:
	docker-compose -f $(COMPOSE_FILE) build

up-compose: build-compose
	docker-compose -f $(COMPOSE_FILE) up -d

stop-compose:
	docker-compose -f $(COMPOSE_FILE) stop

down-compose: stop
	docker-compose -f $(COMPOSE_FILE) down

logs-compose:
	docker-compose -f $(COMPOSE_FILE) logs -f
