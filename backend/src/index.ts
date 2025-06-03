import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { trafficStatsApi } from "./routes/trafficStats";

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(
  cors({
    origin: "https://interactive-dashboard-firebase.vercel.app",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api", trafficStatsApi);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
