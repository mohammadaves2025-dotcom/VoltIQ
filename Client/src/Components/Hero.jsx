import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className="bg-[#0B1120] text-white px-6 py-24">
            <div className="max-w-6xl mx-auto text-center">

                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                    ⚡ AI Electricity Consumption Predictor
                </h1>

                <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
                    A Machine Learning powered system that predicts your monthly electricity
                    consumption and estimates your bill based on real appliance usage patterns.
                </p>

                <div className="mt-10 flex justify-center gap-6">
                    <button onClick={()=> navigate('/dashboard')} className="px-8 py-3 bg-gradient-to-r from-green-400 to-cyan-400 text-black font-semibold rounded-xl shadow-lg hover:scale-105 transition">
                        Start Prediction
                    </button>

                    <button onClick={() => navigate('/howitworks')} className="px-8 py-3 border border-gray-600 rounded-xl hover:bg-white/10 transition">
                        How It Works
                    </button>
                </div>
            </div>
        </section>

    )
}

export default Hero
