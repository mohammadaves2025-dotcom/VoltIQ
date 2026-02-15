from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import os

app = FastAPI(title="Smart Energy ML API")

# ----------------------------
# Load model safely
# ----------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model", "rf_energy_model.pkl")

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")

model = joblib.load(MODEL_PATH)

# ----------------------------
# CORS (temporary open config)
# ----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict after deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# Input Schema
# ----------------------------
class EnergyInput(BaseModel):
    Fans: int
    ACs: int
    Fridges: int
    TVs: int
    Laptops: int
    Washing_Machines: int
    Daily_Hours_Fan: float
    Daily_Hours_AC: float
    Daily_Hours_Fridge: float
    Daily_Hours_TV: float
    Daily_Hours_Laptop: float
    Daily_Hours_WM: float


# ----------------------------
# Health Check Route
# ----------------------------
@app.get("/")
def home():
    return {"status": "ML API running successfully"}


# ----------------------------
# Prediction Route
# ----------------------------
@app.post("/predictenergy")
def predict_energy(data: EnergyInput):

    input_data = np.array([[
        data.Fans,
        data.ACs,
        data.Fridges,
        data.TVs,
        data.Laptops,
        data.Washing_Machines,
        data.Daily_Hours_Fan,
        data.Daily_Hours_AC,
        data.Daily_Hours_Fridge,
        data.Daily_Hours_TV,
        data.Daily_Hours_Laptop,
        data.Daily_Hours_WM
    ]])

    prediction = model.predict(input_data)[0]

    return {
        "predicted_monthly_kWh": round(float(prediction), 2)
    }
