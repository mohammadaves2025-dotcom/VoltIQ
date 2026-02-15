import React from 'react'

const Info = () => {

    return (
        <section className="bg-[#0B1120] text-white py-20 px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

                <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10">
                    <h3 className="text-xl font-semibold text-green-400">Problem</h3>
                    <p className="mt-4 text-gray-300">
                        Most households lack clarity on how daily appliance usage affects their
                        monthly electricity bills.
                    </p>
                </div>

                <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10">
                    <h3 className="text-xl font-semibold text-cyan-400">Solution</h3>
                    <p className="mt-4 text-gray-300">
                        Our Random Forest ML model analyzes appliance count and daily usage
                        to predict consumption and bill estimates.
                    </p>
                </div>

                <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10">
                    <h3 className="text-xl font-semibold text-purple-400">Tech Stack</h3>
                    <p className="mt-4 text-gray-300">
                         MERN · Python · Scikit-learn · Random Forest · Pandas · NumPy 
                    </p>
                </div>

            </div>
        </section>

    )
}

export default Info
