from fastapi import FastAPI
import random

app = FastAPI()

@app.get("/")
def home():
    return {"message": "NGIG Backend Running"}

@app.get("/district-risk")
def district():
    return {
        "district": "Demo District",
        "risk_score": random.randint(40,95),
        "recommended_action": "Deploy inspection team"
    }