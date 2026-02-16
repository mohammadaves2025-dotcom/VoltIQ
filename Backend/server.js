import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRouter.js';
import predictRouter from './routes/predictRouter.js';

// APP CONFIG
const app = express();
// Note: 'port' variable isn't strictly needed for Vercel, but safe to leave.
const port = process.env.PORT || 4000 

// 1️⃣ SERVERLESS DB CONNECTION MIDDLEWARE
// This ensures the DB is connected before any route runs, 
// without blocking the initial file load.
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: "Database connection failed" });
    }
});

// 2️⃣ MIDDLEWARES
app.use(express.json())
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// 3️⃣ API ENDPOINTS
app.use('/api/user', userRouter)
app.use('/api/predict', predictRouter)

app.get('/', (req, res) => {
    res.send("API working ")
})

// ❌ NO app.listen()
// ✅ export app
export default app;