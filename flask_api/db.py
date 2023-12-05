from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

DATABASE_URL = "sqlite:///travellers.db"

engine = create_engine(DATABASE_URL)
Base.metadata.create_all(bind=engine)

Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
