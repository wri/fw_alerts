FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8-slim

RUN pip install redis

COPY ./app /app/app
