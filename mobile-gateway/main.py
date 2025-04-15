from fastapi import FastAPI, Request
import httpx
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

USER_SERVICE_URL = os.getenv("USER_SERVICE_URL")
RESTAURANT_SERVICE_URL = os.getenv("RESTAURANT_SERVICE_URL")

@app.get("/mobile/users/{path:path}")
async def proxy_user(path: str, request: Request):
    async with httpx.AsyncClient() as client:
        response = await client.request(
            method=request.method,
            url=f"{USER_SERVICE_URL}/{path}",
            headers=request.headers.raw,
            params=request.query_params
        )
        return response.json()

@app.get("/mobile/restaurants/{path:path}")
async def proxy_restaurant(path: str, request: Request):
    async with httpx.AsyncClient() as client:
        response = await client.request(
            method=request.method,
            url=f"{RESTAURANT_SERVICE_URL}/{path}",
            headers=request.headers.raw,
            params=request.query_params
        )
        return response.json()
