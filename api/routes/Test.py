from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse
from starlette import status
from fastapi import FastAPI, Form,File,UploadFile
from pydantic import BaseModel
from fastapi import Request
import mysql.connector
from mysql.connector import Error


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

dummy_marker_data = {
    "title": "Dummy Marker",
    "Latitude": 37.1234,
    "Longitude": 127.5678
}

dummy_marker_data = {
    "title": "Dummy Marker",
    "Latitude": 37.1234,
    "Longitude": 127.5678
}

# Read

@router.post("/")
def test():
    print("Hello World")   
    return {"msg": "hello world!"}

#region 05/21
@router.post("/finite")
def receive_data(pos: Pos):
    #06/05 start
    connection = get_db_connection()
    if connection is None:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    try:
        cursor = connection.cursor()
        query = "INSERT INTO Bus_info (latitude, longitude) VALUES (%s, %s)"
        cursor.execute(query, (pos.Latitude, pos.Longitude))
        connection.commit()
        cursor.close()
        connection.close()
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))
    #06/05 end

    # try: #여기 원래 주석이였음
    #     #Latitude = pos.Latitude 06/05
    #     #Longitude = pos.Longitude
    #     #print(Latitude)
    #     #print(Longitude) 06/05
    #     return {"status" : "success"}   
    # except Exception as e:
    #     print(e)
    #     raise HTTPException(status_code=422, detail=str(e))
#endregion 05/21

# @router.get("/echo")
# def echo(location: str):
#     dummy_marker_data = {
#         "title": "Dummy Marker",
#         "Latitude": 37.1234,
#         "Longitude": 127.5678
#     }
#     return dummy_marker_data

@router.get("/max_num/")
def get_max_num():
    connection = get_db_connection()
    if connection is None:
        raise HTTPException(status_code=500, detail="Database connection failed")
    try:
        # MySQL 연결
        cursor = connection.cursor()

        # 쿼리 실행
        cursor.execute("SELECT latitude, longitude FROM Bus_info WHERE num = (SELECT MAX(num) FROM Bus_info)")
        result = cursor.fetchone()
        
        cursor.close()
        connection.close()

        if result is None:
            raise HTTPException(status_code=404, detail="No items found")

        latitude, longitude = result
        return {"latitude": latitude, "longitude": longitude}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

        # 최대값 조회 쿼리 실행
        cursor.execute("SELECT latitude, longitude FROM Bus_info WHERE num = (SELECT MAX(num) FROM Bus_info)")
        result = cursor.fetchone()

        cursor.close()
        conn.close()

        if result is None:
            raise HTTPException(status_code=404, detail="No data found")

        latitude, longitude = result
        return {"latitude": latitude, "longitude": longitude}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))