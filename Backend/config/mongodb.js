import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    return; // 🔥 Skip if already connected
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_DB_URI);
    isConnected = db.connections[0].readyState;
    console.log("CONNECTED TO DB:", db.connection.name);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};

export default connectDB;
