
.PHONY: all
all: docker 

.PHONY: docker
docker:
	@echo "Сборка Docker образа..."
	@. ./scripts/build-docker_review.sh

.PHONY: version
version:
	@git describe --tags --abbrev=0 2>/dev/null || echo "unknown"

.PHONY: help
help:
	@echo "Доступные команды:"
	@echo "  make docker    - Собрать Docker образ"
	@echo "  make version   - Показать текущую версию"
	@echo "  make help      - Показать эту справку"

.DEFAULT_GOAL := help
