import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRouter.js';
import predictRouter from './routes/predictRouter.js';

//APP CONFIG
const app = express();
const port = process.env.PORT || 4000
connectDB()


//  MIDDLEWARES
app.use(express.json())
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

//API ENDPOINTS
app.use('/api/user', userRouter)
app.use('/api/predict', predictRouter)


app.get('/', (req, res) => {
    res.send("API working ")
})

// ❌ NO app.listen()
// ✅ export app
export default app;