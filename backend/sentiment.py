from transformers import pipeline

classifier = pipeline(
    "sentiment-analysis",
    model="./fine_tuned_model"
)

def analyze_text(text):

    result = classifier(text)[0]

    label_map = {

    "LABEL_0": "Negative",

    "LABEL_1": "Positive",

    "NEGATIVE": "Negative",

    "POSITIVE": "Positive"
}

    sentiment = label_map[result["label"]]

    confidence = round(result["score"] * 100, 2)

    return sentiment, confidence