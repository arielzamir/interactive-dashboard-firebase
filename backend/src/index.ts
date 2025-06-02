import express from "express";
import cors from "cors";
import { trafficStatsApi } from "./routes/trafficStats";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use("/api", trafficStatsApi);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
