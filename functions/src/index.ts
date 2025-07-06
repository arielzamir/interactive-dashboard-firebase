import express from "express";
import cors from "cors";
import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { defineString } from "firebase-functions/params";
import { trafficStatsApi } from "./routes/trafficStats";

const REGION = defineString("REGION");

const missingEssentialEnvVariables = Object.entries({
  REGION,
})
  .filter(([_, value]) => !value)
  .map(([name]) => name);

if (missingEssentialEnvVariables.length > 0) {
  throw new Error(
    `The following environment variables are missing: ${missingEssentialEnvVariables.join(
      ", "
    )}`
  );
}

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 86400,
};
app.use(cors(corsOptions));

app.get("/health", (req, res) => res.status(200).send("OK"));

app.get("/basicConnectionTest", (req, res) => {
  logger.info({ message: "a request was made!" });
  res.status(200).send({ message: "Connection succeeded!" });
});

app.use("/", trafficStatsApi);

export const api = onRequest({ region: REGION }, app);
