import express from 'express'
import { predictEnergy } from "../controllers/predictController.js";


const predictRouter = express.Router();

predictRouter.post('/predictenergy' ,predictEnergy);


export default predictRouter;