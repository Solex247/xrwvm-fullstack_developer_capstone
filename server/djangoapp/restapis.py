import os
from urllib.parse import quote

import requests
from dotenv import load_dotenv

load_dotenv()

backend_url = os.getenv("backend_url", default="http://localhost:3030")
sentiment_analyzer_url = os.getenv(
    "sentiment_analyzer_url", default="http://localhost:5050/"
)

if not backend_url or "your backend url" in backend_url:
    backend_url = "http://localhost:3030"

if not sentiment_analyzer_url or "your code engine deployment url" in sentiment_analyzer_url:
    sentiment_analyzer_url = "http://localhost:5050/"

backend_url = backend_url.rstrip("/")
if not sentiment_analyzer_url.endswith("/"):
    sentiment_analyzer_url = f"{sentiment_analyzer_url}/"


def get_request(endpoint, **kwargs):
    params = ""
    if kwargs:
        for key, value in kwargs.items():
            params = params + f"{key}={value}&"
        params = params.rstrip("&")
    request_url = f"{backend_url}{endpoint}"
    if params:
        request_url = f"{request_url}?{params}"
    print(f"GET from {request_url}")
    try:
        response = requests.get(request_url)
        return response.json()
    except Exception as err:
        print(f"Unexpected {err=}, {type(err)=}")
        print("Network exception occurred")


def analyze_review_sentiments(text):
    request_url = f"{sentiment_analyzer_url}analyze/{quote(text)}"
    try:
        response = requests.get(request_url)
        return response.json()
    except Exception as err:
        print(f"Unexpected {err=}, {type(err)=}")
        print("Network exception occurred")


def post_review(data_dict):
    request_url = f"{backend_url}/insert_review"
    try:
        response = requests.post(request_url, json=data_dict)
        print(response.json())
        return response.json()
    except Exception as err:
        print(f"Unexpected {err=}, {type(err)=}")
        print("Network exception occurred")
