from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session

from schemas import TextRequest
from sentiment import analyze_text

from database import SessionLocal
from model import SentimentHistory


router = APIRouter()


@router.post("/api/analyze")
def analyze(request: TextRequest):

    text = request.text.strip()

    if not text:

        raise HTTPException(
            status_code=400,
            detail="Input cannot be empty"
        )

    sentiment, confidence = analyze_text(text)

    db: Session = SessionLocal()

    history = SentimentHistory(
        text=text,
        sentiment=sentiment,
        confidence=confidence
    )

    db.add(history)

    db.commit()

    db.close()

    return {
        "sentiment": sentiment,
        "confidence": confidence
    }