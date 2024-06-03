import uvicorn
from fastapi import FastAPI, Depends
# from sqlalchemy.orm import Session

#from core import models
from routes import routers

app = FastAPI()

#05/21
db_config = {
    'user': 'yourDBUser',
    'password': 'yourDBPassword',
    'host': 'yourDBHost',
    'database': 'yourDBName'
}
#05/21


for router in routers:
    app.include_router(router)


if __name__ == "__main__":
    uvicorn.run(app='main:app', host='0.0.0.0', port=5001)
