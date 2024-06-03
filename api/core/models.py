from sqlalchemy import Column, Float, ForeignKey, Integer, TIMESTAMP, Table, Text
from sqlalchemy.sql.sqltypes import NullType
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata

#table
class data(Base):
    __tablename__ = 'Bus_info'

    num = Column(Integer, primary_key=True)
    latitude = Column(Text, nullable=False)
    longitude = Column(TEXT, nullable=False)
"""
예제 코드
class Employee(Base):
   __tablename__ = 'employees'
   id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
   firstname = sqlalchemy.Column(sqlalchemy.String(length=100))
   lastname = sqlalchemy.Column(sqlalchemy.String(length=100))
   active = sqlalchemy.Column(sqlalchemy.Boolean, default=True)
   """