import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const appliancePowerMap = {
  fans: { label: "Fan", power: 75 },
  acs: { label: "Air Conditioner", power: 1500 },
  fridges: { label: "Fridge", power: 300 },
  laptops: { label: "Laptop", power: 90 },
  tvs: { label: "Television", power: 120 },
  washing: { label: "Washing Machine", power: 500 },
};

const Usage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedAppliances = location.state?.appliances || {};

  // Build dynamic appliance list

  const initialAppliances = Object.entries(selectedAppliances)
    .filter(([_, count]) => count > 0)
    .map(([key, count], index) => ({
      id: index + 1,
      key,
      name: appliancePowerMap[key].label,
      power: appliancePowerMap[key].power,
      hours: 1,
      count
    }));

  const [appliances, setAppliances] = useState(initialAppliances);
  const [tariff, setTariff] = useState(8);

  const handleHoursChange = (id, value) => {
    setAppliances(prev =>
      prev.map(app =>
        app.id === id ? { ...app, hours: Number(value) } : app
      )
    );
  };
  const totalDailyUnits = appliances.reduce(
    (sum, app) =>
      sum + (app.power * app.hours * app.count) / 1000,
    0
  );
  const estimatedMonthlyBill = totalDailyUnits * 30 * tariff;



  return (
    <div className="min-h-screen bg-[#0B1120] text-white px-6 py-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-cyan-400">
            ⚡ Energy Usage Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Configure appliance timings and track real-time energy cost.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT: Appliances */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {appliances.map((app) => (
              <div
                key={app.id}
                className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10"
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="font-semibold text-cyan-400">
                    {app.name}
                  </h2>
                  <span className="text-xs text-gray-400">
                    {app.power}W
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="24"
                  value={app.hours}
                  onChange={(e) =>
                    handleHoursChange(app.id, e.target.value)
                  }
                  className="w-full accent-cyan-400 h-2"
                />

                <div className="flex justify-between mt-3 text-sm">
                  <span className="text-gray-400">
                    {app.hours} hrs/day
                  </span>
                  <span className="text-green-400 font-medium">
                    {((app.power * app.hours * app.count) / 1000).toFixed(2)} kWh
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Summary Panel */}
          <div className="space-y-6">

            {/* Tariff Card */}
            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
              <h3 className="text-purple-400 font-semibold mb-4">
                💰 Tariff (₹/kWh)
              </h3>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setTariff((prev) => Math.max(prev - 1, 1))}
                  className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg"
                >
                  −
                </button>

                <span className="text-2xl font-bold text-purple-400">
                  ₹ {tariff}
                </span>

                <button
                  onClick={() => setTariff((prev) => prev + 1)}
                  className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Summary Card */}
            <div className="bg-gradient-to-br from-green-400/10 to-cyan-400/10 p-6 rounded-2xl border border-green-400/30">
              <h3 className="text-green-400 font-semibold mb-4">
                🔍 Live Summary
              </h3>

              <div className="space-y-2 text-sm">
                <p className="flex justify-between">
                  <span className="text-gray-400">
                    Daily Consumption
                  </span>
                  <span className="text-cyan-400 font-semibold">
                    {totalDailyUnits.toFixed(2)} kWh
                  </span>
                </p>

              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() =>
                navigate('/result', {
                  state: { appliances, tariff }
                })
              }

              className="w-full py-3 bg-gradient-to-r from-green-400 to-cyan-400
            text-black font-semibold rounded-xl
            hover:scale-105 transition"
            >
              🚀 Run ML Prediction
            </button>

          </div>
        </div>
      </div>
    </div >
  );
};

export default Usage;


