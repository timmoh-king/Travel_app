from sqlalchemy import Column, Integer, String, ForeignKey
from db import Base


class ListItem(Base):
    __tablename__ = 'list_item'

    id = Column(Integer, primary_key=True)
    item = Column(String(255), nullable=False)
    quantity = Column(Integer, nullable=False)
    packing_list_id = Column(Integer, ForeignKey('packing_list.id'), nullable=False)
