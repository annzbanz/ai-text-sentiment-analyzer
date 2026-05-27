from sqlalchemy import Column, Integer, String, Float, Text, TIMESTAMP
from sqlalchemy.sql import func

from database import Base


class SentimentHistory(Base):

    __tablename__ = "history"

    id = Column(Integer, primary_key=True, index=True)

    text = Column(Text, nullable=False)

    sentiment = Column(String(50), nullable=False)

    confidence = Column(Float, nullable=False)

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )