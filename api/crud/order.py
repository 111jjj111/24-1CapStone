from datetime import datetime
from typing import Union

import bcrypt
from sqlalchemy.orm import Session

from core.models import Order, Payment
from crud.Payments import create_payment, payment_count
from crud.Products import get_product_price, get_product_name
from schema.Order import OrderUpdateReq, OrderReq

from utils.toss.client import TossPayClient
from fastapi import HTTPException

#Creating new session
Session = sqlalchemy.orm.sessionmaker()
Session.configure(bind=engine)
Session = Session()

def read_bus_info_ALL():
    #employees = session.query(Employee).all() select 예제코드
    employees = session.query(data).all()


def insert_bus_info(latitude:str,longitude:str):
    """
    insert 예제코드
    newEmployee = Employee(firstname=”Rob”, lastname=”Hedgpeth”)
    session.add(newEmployee)
    session.commit()
    """
    newEmployee = data(latitude=latitude, longitude=longitude)
    session.add(newEmployee)
    session.commit()
