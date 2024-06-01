from pydantic import BaseModel

class Bus_info(BaseModel):
    num:int
    latitude:str
    longitude:str