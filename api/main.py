import uvicorn
from fastapi import FastAPI, Depends
# from sqlalchemy.orm import Session

#from core import models
from routes import routers

app = FastAPI()

for router in routers:
    app.include_router(router)


if __name__ == "__main__":
    uvicorn.run(app='main:app', host='0.0.0.0', port=80)
