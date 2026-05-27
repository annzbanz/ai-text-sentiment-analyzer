from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routes.analyze import router as analyze_router
from routes.history import router as history_router
from model import SentimentHistory


Base.metadata.create_all(bind=engine)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(analyze_router)
app.include_router(history_router)


@app.get("/")
def home():

    return {
        "message": "AI Sentiment Analyzer API Running"
    }