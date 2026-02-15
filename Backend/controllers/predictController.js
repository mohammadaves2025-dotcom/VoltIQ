import axios from "axios";

export const predictEnergy = async (req, res) => {
  const mlurl = process.env.ML_API_URL;

  try {
    const { appliances, tariff } = req.body;

    // Default payload structure
    const payload = {
      Fans: 0,
      ACs: 0,
      Fridges: 0,
      TVs: 0,
      Laptops: 0,
      Washing_Machines: 0,
      Daily_Hours_Fan: 0,
      Daily_Hours_AC: 0,
      Daily_Hours_Fridge: 0,
      Daily_Hours_TV: 0,
      Daily_Hours_Laptop: 0,
      Daily_Hours_WM: 0,
    };

    // Map frontend data → ML schema
    appliances.forEach((app) => {
      switch (app.key) {
        case "fans":
          payload.Fans = app.count;
          payload.Daily_Hours_Fan = app.hours;
          break;

        case "acs":
          payload.ACs = app.count;
          payload.Daily_Hours_AC = app.hours;
          break;

        case "fridges":
          payload.Fridges = app.count;
          payload.Daily_Hours_Fridge = app.hours;
          break;

        case "tvs":
          payload.TVs = app.count;
          payload.Daily_Hours_TV = app.hours;
          break;

        case "laptops":
          payload.Laptops = app.count;
          payload.Daily_Hours_Laptop = app.hours;
          break;

        case "washing":
          payload.Washing_Machines = app.count;
          payload.Daily_Hours_WM = app.hours;
          break;
      }
    });

    // Call ML service
    const response = await axios.post(
      `${mlurl}/predictenergy`,
      payload
    );

    const predicted = response.data.predicted_monthly_kWh;

    res.status(200).json({
      predicted_kwh: predicted,
      estimated_bill: predicted * tariff,
    });

  } catch (error) {
    console.error(
      "Prediction error:",
      error.response?.data || error.message
    );

    res.status(500).json({ error: "Prediction failed" });
  }
};
