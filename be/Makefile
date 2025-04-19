# Set default service name
SERVICE = backend

# Build Docker containers
build:
	docker compose build

# Start Docker containers in detached mode
up:
	docker compose up -d

# Stop and remove Docker containers
down:
	docker compose down

# View logs of the backend service
logs:
	docker compose logs -f $(SERVICE)

# Rebuild and restart the containers
rebuild:
	docker compose down
	docker compose up --build -d

# Check the status of the containers
status:
	docker compose ps

# Clean up unused Docker images
prune:
	docker image prune -f
