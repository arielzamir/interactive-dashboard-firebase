import { Router } from "express";
import { checkAuth, checkRole } from "../middlewares/authMiddleware";
import {
  addStatController,
  deleteStatController,
  getAllStatsController,
  updateStatController,
} from "../controllers/trafficStatsController";

const router = Router();

router.use(checkAuth);

router.get("/traffic", getAllStatsController);
router.post("/traffic", checkRole("editor"), addStatController);
router.put("/traffic/:id", checkRole("editor"), updateStatController);
router.delete("/traffic/:id", checkRole("editor"), deleteStatController);

export const trafficStatsApi = router;
