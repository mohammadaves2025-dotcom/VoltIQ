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
    // 🔥 ALWAYS reset loading when page is visited
    setLoading(true);
    setPrediction(null);

    if (!appliances.length) {
      setLoading(false);
      return;
    }

    const fetchPrediction = async () => {
      try {
        const response = await axios.post(
          `${backendUrl}/api/predict/predictenergy`,
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

  // 👇 THIS is the key line
  }, [location.key]);

  /* 🌟 LOADING SCREEN */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070B16] relative overflow-hidden text-white px-6">

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#0b1120] to-[#020617]" />

        {/* Glow */}
        <div className="absolute w-[500px] h-[500px] bg-cyan-400/10 blur-[140px] rounded-full -top-40 -left-40" />
        <div className="absolute w-[500px] h-[500px] bg-emerald-400/10 blur-[140px] rounded-full -bottom-40 -right-40" />

        {/* Content */}
        <div className="relative z-10 text-center max-w-md">
          <div className="mx-auto mb-8 w-20 h-20 rounded-full border-4 border-cyan-400/30 border-t-cyan-400 animate-spin" />

          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Running Energy Prediction…
          </h1>

          <p className="text-gray-400 mt-4 text-sm sm:text-base">
            Our AI is analyzing your appliances.<br />
            This may take a few seconds ⚡
          </p>

          <div className="mt-10 bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-lg">
            <p className="text-gray-300 italic text-sm">
              “Electricity is really just organized lightning —  
              please wait while we tame it.”
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* 🌟 RESULT PAGE */
  return (
    <div className="min-h-screen bg-[#0B1120] px-6 py-20 text-white">

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          ⚡ Energy Consumption Analysis
        </h1>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Based on your appliance usage data, our Machine Learning model
          predicts your monthly electricity consumption and estimated bill.
        </p>
      </div>

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
    </div>
  );
};

export default Result;



