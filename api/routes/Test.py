from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
from starlette import status

router = APIRouter(
    prefix="/test",
    tags=["Test"]
)


# Create is in Auth.py

# Read
@router.get("/echo")
def echo(x: float, y: float):
    return {"x": x, "y": y}


@router.post("/")
def test():
    return {"msg": "hello world!"}