import * as functions from "firebase-functions/v1";
import express from "express";
import cors from "cors";
import {trafficStatsApi} from "./routes/trafficStats";

const app = express();

app.use(cors({origin: true}));
app.use(express.json());

app.use("/api", trafficStatsApi);

export const trafficStats = functions
  .region("us-central1")
  .https.onRequest(app);
