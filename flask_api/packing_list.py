from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from datetime import datetime
from db import Base


class PackingList(Base):
    __tablename__ = 'packing_list'

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    date = Column(String, nullable=False)
    time = Column(String, nullable=False)

    @property
    def formatted_date(self):
        return datetime.strptime(str(self.date), "%d/%m/%Y").strftime("%d/%m/%y")

    @property
    def formatted_time(self):
        return datetime.strptime(str(self.time), "%H:%M").strftime("%H:%M")

    items = relationship('ListItem', backref='packing_list', lazy=True)
