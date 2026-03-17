# Full Stack Developer Capstone

**Project Name:** Full Stack Developer Capstone  
**Repository Name:** xrwvm-fullstack_developer_capstone

## Overview
This project delivers a full-stack car dealership application with user
authentication, dealer listings and reviews, sentiment analysis, and an admin
experience for managing car makes and models. Django serves as the primary web
app and proxy layer, React powers the UI, and an Express + MongoDB service
provides dealer and review data.

## Key Features
- User registration, login, and logout
- Dealer list with state filtering
- Dealer detail view with reviews and sentiment
- Post review flow for authenticated users
- Admin UI for car makes and models
- Proxy services in Django to integrate external APIs
- CI linting via GitHub Actions

## Architecture
- Frontend: React app in `server/frontend`, built and served by Django
- Backend (Django): `server/` for routing, authentication, and proxy APIs
- Data Service (Express + MongoDB): `server/database`
- Sentiment Analyzer: Flask service in `server/djangoapp/microservices`

## Tech Stack
- Python, Django, Gunicorn
- JavaScript, React, Bootstrap
- Node.js, Express, MongoDB
- Docker, Kubernetes
- GitHub Actions (flake8, jshint)

## Project Structure
- `server/` Django project, Docker/K8s artifacts
- `server/djangoapp/` Django app with views, models, and proxy services
- `server/frontend/` React app
- `server/database/` Express + MongoDB service
- `.github/workflows/` CI lint workflow

## Prerequisites
- Python 3.10+ and pip
- Node.js 16+ and npm
- Docker Desktop
- Git

## Configuration
Set environment variables in `server/djangoapp/.env`:
```
backend_url=http://localhost:3030
sentiment_analyzer_url=http://localhost:5050/
```
`backend_url` should not have a trailing slash.  
`sentiment_analyzer_url` should include a trailing slash.

## Local Development
### 1) Start the Express + MongoDB backend
```
cd server/database
docker compose up
```

### 2) Start the sentiment analyzer (local)
```
cd server/djangoapp/microservices
python -m pip install -r requirements.txt
python -c "import nltk; nltk.download('vader_lexicon')"
FLASK_APP=app.py flask run --host=0.0.0.0 --port 5050
```

### 3) Build the React frontend
```
cd server/frontend
npm install
npm run build
```

### 4) Run Django
```
cd server
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
Open `http://localhost:8000`.

## Django Proxy Endpoints
- `GET /djangoapp/get_dealers`
- `GET /djangoapp/get_dealers/<state>`
- `GET /djangoapp/dealer/<id>`
- `GET /djangoapp/reviews/dealer/<id>`
- `POST /djangoapp/add_review`
- `GET /djangoapp/get_cars`
- `POST /djangoapp/login`
- `POST /djangoapp/register`
- `GET /djangoapp/logout`

## Express API Endpoints
- `GET /fetchDealers`
- `GET /fetchDealers/:state`
- `GET /fetchDealer/:id`
- `GET /fetchReviews`
- `GET /fetchReviews/dealer/:id`
- `POST /insert_review`

## CI/CD
- A GitHub Actions workflow runs linting on push and pull request.
- Python: `flake8` across `server/`
- JavaScript: `jshint` across `server/database`

## Containerization
Docker and Kubernetes artifacts live in `server/`:
- `Dockerfile`
- `entrypoint.sh`
- `deployment.yaml`

Example container build:
```
cd server
docker build -t dealership:latest .
```

## Troubleshooting
Dealers list is empty:
- Confirm `backend_url` is correct and Django was restarted
- Verify `curl http://localhost:3030/fetchDealers`

Sentiment missing:
- Ensure the sentiment analyzer is running
- Verify `sentiment_analyzer_url` in `.env`

## License
See `LICENSE`.
