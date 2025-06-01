import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import {trafficStatsApi} from "./routes/trafficStats";

const app = express();

app.use(express.json());
app.use(cors({origin: true}));

app.use("/api", trafficStatsApi);

export const trafficStats = functions.https.onRequest(app);
