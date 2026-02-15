import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Result = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const location = useLocation();

    const { appliances = [], tariff = 8 } = location.state || {};

    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!appliances.length) return;

        const fetchPrediction = async () => {
            try {
                const response = await axios.post(
                    backendUrl + "/api/predict/predictenergy",
                    { appliances, tariff }
                );
                setPrediction(response.data);
            } catch (error) {
                console.error("Prediction Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPrediction();
    }, [appliances, tariff]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0B1120] text-white flex items-center justify-center">
                Running ML Model...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B1120] px-6 py-20 text-white">

            {/* 🔥 Title Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                    ⚡ Energy Consumption Analysis
                </h1>
                <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                    Based on your appliance usage data, our Machine Learning model 
                    predicts your monthly electricity consumption and estimated bill.
                </p>
            </div>

            {/* 📊 Result Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

                <div className="bg-gradient-to-br from-green-400/10 to-cyan-400/10 p-8 rounded-2xl border border-green-400/30 backdrop-blur-xl">
                    <h3 className="text-lg text-green-400">Predicted Consumption</h3>
                    <p className="text-4xl font-bold mt-4">
                        {prediction?.predicted_kwh?.toFixed(2)} kWh
                    </p>
                </div>

                <div className="bg-gradient-to-br from-purple-400/10 to-cyan-400/10 p-8 rounded-2xl border border-purple-400/30 backdrop-blur-xl">
                    <h3 className="text-lg text-purple-400">Estimated Monthly Bill</h3>
                    <p className="text-4xl font-bold mt-4">
                        ₹ {prediction?.estimated_bill?.toFixed(0)}
                    </p>
                </div>
            </div>

            {/* 🧠 Model Working Section */}
            <div className="mt-24 max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-2xl">
                <h2 className="text-3xl font-bold text-cyan-400 mb-6">
                    🧠 How Our ML Model Works
                </h2>

                <div className="space-y-6 text-gray-300 leading-relaxed">

                    <div>
                        <h3 className="text-green-400 font-semibold">
                            1️⃣ Feature Engineering
                        </h3>
                        <p>
                            Appliance wattage, usage hours, and tariff rate are converted 
                            into structured numerical features suitable for prediction.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-green-400 font-semibold">
                            2️⃣ Consumption Prediction
                        </h3>
                        <p>
                            A trained regression model analyzes total load patterns and 
                            predicts monthly energy usage in kilowatt-hours (kWh).
                        </p>
                    </div>

                    <div>
                        <h3 className="text-green-400 font-semibold">
                            3️⃣ Bill Estimation
                        </h3>
                        <p>
                            The predicted consumption is multiplied by the tariff rate 
                            to calculate the estimated monthly electricity bill.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-green-400 font-semibold">
                            4️⃣ Optimization Insight
                        </h3>
                        <p>
                            Based on appliance contribution, the system can later 
                            suggest energy-saving optimizations and usage adjustments.
                        </p>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Result;


