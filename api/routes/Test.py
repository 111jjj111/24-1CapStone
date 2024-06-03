from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
from starlette import status
from fastapi import FastAPI, Form,File,UploadFile
from pydantic import BaseModel
from fastapi import Request
# import mysql.connector
# from mysql.connector import Error


router = APIRouter(
    prefix="/test",
    tags=["Test"]
)

#FastAPI객체생성
app = FastAPI()

# Create is in Auth.py
class Pos(BaseModel):
    Latitude: str
    Longitude: str


# Read

@router.post("/")
def test():
    print("Hello World")
    return {"msg": "hello world!"}

#region 05/21
@router.post("/finite")
def receive_data(pos: Pos):
    try: #여기 원래 주석이였음
        Latitude = pos.Latitude
        Longitude = pos.Longitude
        print(Latitude)
        print(Longitude)
        # conn = mysql.connector.connect(**db_config)
        # cursor = conn.cursor()
        # query = "INSERT INTO TableName (column1, column2) VALUES (%s, %s)"
        # cursor.execute(query,(Latitude, Longitude))
        # conn.commit()

        # cursor.close()
        # conn.close()
        return {"status" : "success"}   
    except Exception as e:
        print(e)
        raise HTTPException(status_code=422, detail=str(e))
#endregion 05/21

@router.post("/echo")
def echo(pos: Pos):
    return {"Latitude": pos.Latitude, "Longitude": pos.Longitude}



