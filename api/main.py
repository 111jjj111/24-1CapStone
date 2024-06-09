import uvicorn
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
# from sqlalchemy.orm import Session

#from core import models
from routes import routers

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 출처 허용 (보안이 필요한 경우 특정 도메인을 지정)
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메소드 허용
    allow_headers=["*"],  # 모든 HTTP 헤더 허용
)

#05/21
db_config = {
    'host': '113.198.229.225',
    'user': 'root',
    'password': '12341234',
    'database': 'capstone'
}
#05/21


for router in routers:
    app.include_router(router)


if __name__ == "__main__":
    uvicorn.run(app='main:app', host='0.0.0.0', port=5001)
