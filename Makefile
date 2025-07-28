# Makefile for Face Swap Web

# Frontend
install-ui:
	npm install

build-ui: install-ui
	npm run build

run-ui:
	npm run dev

# Backend
install-backend:
	cd backend && pip install --no-cache-dir -r requirements.txt

run-backend:
	cd backend && FLASK_APP=api.py flask run --host=0.0.0.0 --port=5555

# Docker
build-ui-container: install-ui
	docker build -t faceswap-ui .

build-backend-container:
	cd backend && docker build -t faceswap-backend .

run-ui-container:
	docker run --rm -p 8080:80 faceswap-ui

run-backend-container:
	docker run --rm -p 5555:5555 faceswap-backend

# Clean
clean-ui:
	rm -rf dist node_modules

clean-backend:
	cd backend && rm -rf __pycache__

.PHONY: install-ui build-ui run-ui install-backend run-backend build-ui-container build-backend-container run-ui-container run-backend-container clean-ui clean-backend
