import React from "react";

const steps = [
  {
    title: "Appliance Selection",
    icon: "⚡",
    description:
      "Users select the number of electrical appliances in their household including fans, ACs, refrigerators, TVs, laptops, and washing machines.",
  },
  {
    title: "Usage Configuration",
    icon: "⏱️",
    description:
      "Users define how many hours per day each appliance operates. Energy consumption depends directly on usage duration.",
  },
  {
    title: "Backend Processing",
    icon: "🧠",
    description:
      "The MERN backend validates and structures appliance data before securely forwarding it to the ML microservice.",
  },
  {
    title: "ML Prediction",
    icon: "📊",
    description:
      "A trained Random Forest Regression model analyzes appliance patterns and predicts monthly electricity consumption (kWh).",
  },
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white px-6 py-16 relative overflow-hidden">

      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-400/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/10 blur-3xl rounded-full"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            ⚙️ How The Energy Prediction System Works
          </h1>
          <p className="text-gray-400 mt-4 max-w-3xl mx-auto">
            Our platform combines electrical engineering fundamentals with
            machine learning to accurately estimate household electricity
            consumption.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="grid md:grid-cols-2 gap-10 mb-20">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-xl p-8 rounded-2xl 
                         border border-white/10 hover:border-cyan-400/50
                         transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h2 className="text-xl font-semibold text-cyan-400 mb-3">
                {index + 1}. {step.title}
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Electrical Knowledge Section */}
        <div className="bg-gradient-to-br from-green-400/10 to-purple-400/10 
                        p-10 rounded-3xl border border-green-400/30 mb-16">
          <h2 className="text-3xl font-bold text-green-400 mb-6">
            🔌 Understanding Power & Energy Consumption
          </h2>

          <div className="space-y-6 text-gray-300">

            <div>
              <h3 className="text-xl text-cyan-400 font-semibold mb-2">
                ⚡ Power (Watts)
              </h3>
              <p>
                Power represents the rate at which an appliance consumes
                electricity. For example:
                <br />
                • Fan ≈ 75W  
                <br />
                • AC ≈ 1500W  
                <br />
                • Refrigerator ≈ 300W
              </p>
            </div>

            <div>
              <h3 className="text-xl text-cyan-400 font-semibold mb-2">
                📈 Energy (kWh)
              </h3>
              <p>
                Energy consumption is calculated as:
                <br />
                <span className="text-green-400 font-semibold">
                  Energy (kWh) = (Power × Hours Used) / 1000
                </span>
                <br />
                If a 1000W appliance runs for 5 hours:
                <br />
                → (1000 × 5) / 1000 = 5 kWh
              </p>
            </div>

            <div>
              <h3 className="text-xl text-cyan-400 font-semibold mb-2">
                💰 Electricity Bill Formula
              </h3>
              <p>
                Monthly Bill ≈ Total Monthly kWh × Tariff Rate (₹/kWh)
                <br />
                This is how utility providers calculate residential electricity bills.
              </p>
            </div>

          </div>
        </div>

        {/* Architecture Section */}
        <div className="bg-white/5 p-10 rounded-3xl border border-purple-400/30">
          <h2 className="text-3xl font-bold text-purple-400 mb-6">
            🏗 System Architecture
          </h2>

          <div className="grid md:grid-cols-4 gap-6 text-center">

            <div className="p-6 bg-black/30 rounded-2xl border border-white/10">
              <h4 className="text-cyan-400 font-semibold mb-2">Frontend</h4>
              <p className="text-gray-400 text-sm">
                React + Tailwind UI for user interaction
              </p>
            </div>

            <div className="p-6 bg-black/30 rounded-2xl border border-white/10">
              <h4 className="text-cyan-400 font-semibold mb-2">API Layer</h4>
              <p className="text-gray-400 text-sm">
                Express.js handles routing & validation
              </p>
            </div>

            <div className="p-6 bg-black/30 rounded-2xl border border-white/10">
              <h4 className="text-cyan-400 font-semibold mb-2">ML Service</h4>
              <p className="text-gray-400 text-sm">
                FastAPI serves trained model
              </p>
            </div>

            <div className="p-6 bg-black/30 rounded-2xl border border-white/10">
              <h4 className="text-cyan-400 font-semibold mb-2">Model</h4>
              <p className="text-gray-400 text-sm">
                Random Forest Regression predicts kWh
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default HowItWorks;
