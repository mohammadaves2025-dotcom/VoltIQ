from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
import os

app = FastAPI()

# Load trained model safely
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model", "rf_energy_model.pkl")
model = joblib.load(MODEL_PATH)

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

@app.get("/")
def home():
    return {"message": "Energy Prediction ML API Running"}

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

    print("Model expects features:", model.n_features_in_)
    print("Feature names:", model.feature_names_in_)


    prediction = model.predict(input_data)[0]


    return {
        "predicted_monthly_kWh": round(float(prediction), 2)
    }

