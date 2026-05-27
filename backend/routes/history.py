from fastapi import APIRouter

from database import SessionLocal
from model import SentimentHistory

router = APIRouter(
    prefix="/api",
    tags=["History"]
)


@router.get("/history")
def get_history():

    db = SessionLocal()

    records = db.query(SentimentHistory)\
        .order_by(SentimentHistory.id.desc())\
        .all()

    db.close()

    return records