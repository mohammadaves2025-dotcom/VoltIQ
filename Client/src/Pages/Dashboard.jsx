import React, { useState } from "react";
import { FaFan, FaSnowflake, FaLaptop, FaTv, FaBlender } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const appliancesList = [
    { key: "fans", label: "Fans", icon: <FaFan />, max: 10 },
    { key: "acs", label: "ACs", icon: <FaSnowflake />, max: 5 },
    { key: "fridges", label: "Fridges", icon: <FaSnowflake />, max: 5 },
    { key: "laptops", label: "Laptops", icon: <FaLaptop />, max: 8 },
    { key: "tvs", label: "TVs", icon: <FaTv />, max: 6 },
    { key: "washing", label: "Washing Machines", icon: <FaBlender />, max: 4 },
];

const Dashboard = () => {
    const [appliances, setAppliances] = useState({
        fans: 0,
        acs: 0,
        fridges: 0,
        laptops: 0,
        tvs: 0,
        washing: 0,
    });

    const navigate = useNavigate();

    const updateValue = (key, type, max) => {
        setAppliances((prev) => {
            const value =
                type === "inc"
                    ? Math.min(prev[key] + 1, max)
                    : Math.max(prev[key] - 1, 0);

            return { ...prev, [key]: value };
        });
    };

    const totalAppliances = Object.values(appliances).reduce(
        (sum, val) => sum + val,
        0
    );

    

    return (
        <div className="min-h-screen bg-[#0B1120] text-white px-6 py-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-cyan-400">
                        ⚡ Appliance Configuration
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Select the number of appliances in your household.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* LEFT SECTION */}
                    <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                        {appliancesList.map((item) => (
                            <div
                                key={item.key}
                                className="bg-gradient-to-br from-green-400/10 to-cyan-400/10 
                                            p-6 rounded-2xl border border-green-400/30 
                                            backdrop-blur-md 
                                            hover:border-cyan-400/40 
                                            transition-all duration-300"
                            >
                                {/* Header */}
                                <div className="flex justify-between items-center mb-5">
                                    <div className="flex items-center gap-3">
                                        <div className="text-2xl text-green-400">
                                            {item.icon}
                                        </div>
                                        <h3 className="font-semibold text-white">
                                            {item.label}
                                        </h3>
                                    </div>

                                    <span className="text-xs text-gray-400">
                                        Max {item.max}
                                    </span>
                                </div>

                                {/* Counter Box */}
                                <div className="flex items-center justify-between 
                                                bg-black/30 backdrop-blur-sm
                                                border border-white/10
                                                px-4 py-3 rounded-xl">

                                    <button
                                        onClick={() =>
                                            updateValue(item.key, "dec", item.max)
                                        }
                                        className="px-3 py-1 bg-red-500/20 
                                    text-red-400 rounded-lg 
                                    hover:bg-red-500/30 transition"
                                    >
                                        −
                                    </button>

                                    <span className="text-2xl font-bold text-cyan-400">
                                        {appliances[item.key]}
                                    </span>

                                    <button
                                        onClick={() =>
                                            updateValue(item.key, "inc", item.max)
                                        }
                                        className="px-3 py-1 bg-green-500/20 
                                                text-green-400 rounded-lg 
                                                hover:bg-green-500/30 transition"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>



                    {/* RIGHT SUMMARY PANEL */}
                    <div className="space-y-6">

                        <div className="bg-gradient-to-br from-green-400/10 to-cyan-400/10 p-6 rounded-2xl border border-green-400/30">
                            <h3 className="text-green-400 font-semibold mb-4">
                                📊 Selection Summary
                            </h3>

                            <div className="space-y-2 text-sm">
                                {Object.entries(appliances).map(([key, value]) => (
                                    value > 0 && (
                                        <div
                                            key={key}
                                            className="flex justify-between text-gray-300"
                                        >
                                            <span className="capitalize">{key}</span>
                                            <span className="text-cyan-400 font-medium">
                                                {value}
                                            </span>
                                        </div>
                                    )
                                ))}

                                {totalAppliances === 0 && (
                                    <p className="text-gray-500 text-sm">
                                        No appliances selected yet.
                                    </p>
                                )}

                                <div className="border-t border-white/10 pt-3 mt-3 flex justify-between font-semibold">
                                    <span>Total Appliances</span>
                                    <span className="text-purple-400">
                                        {totalAppliances}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() =>
                                navigate("/usage", {
                                    state: { appliances }
                                })
                            }
                            className="w-full py-3 bg-gradient-to-r from-green-400 to-cyan-400 
              text-black font-semibold rounded-xl 
              hover:scale-105 transition"
                        >
                            Next → Configure Usage
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;


