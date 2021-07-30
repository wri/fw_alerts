import json
import os

import redis

from fastapi import FastAPI, HTTPException

app = FastAPI()

success = {"message": "Hello World from Forest Watcher Form Service!"}


@app.get("/v1/fw-alerts")
def root():
    return success


@app.get("/v1/fw-alerts/healthcheck")
def root():
    errors = list()

    vars = ["ENV",
            "LOG_LEVEL",
            "REDIS_ENDPOINT",
            "GFW_DATA_API_KEY"
            ]

    for var in vars:
        try:
            assert os.getenv(var), f"Cannot access {var} variable"
        except Exception as e:
            errors.append(e)

    try:
        redis.Redis(host=os.getenv("REDIS_ENDPOINT"))
    except Exception as e:
        errors.append(e)

    if errors:
        raise HTTPException(status_code=500, detail=fr"Health check failed\n.{[str(e) for e in errors]}")
    else:
        return {"message": "OK"}
