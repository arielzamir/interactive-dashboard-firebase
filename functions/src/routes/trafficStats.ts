import {Router} from "express";
import cors from "cors";
import {checkAuth, checkRole} from "../middlewares/authMiddleware";
import {
  addStatController,
  deleteStatController,
  getAllStatsController,
  updateStatController,
} from "../controllers/trafficStatsController";

// eslint-disable-next-line new-cap
const router = Router();

router.use(cors({origin: true}));
router.use(checkAuth);

router.get("/traffic", getAllStatsController);
router.post("/traffic", checkRole("editor"), addStatController);
router.put("/traffic/:id", checkRole("editor"), updateStatController);
router.delete("/traffic/:id", checkRole("editor"), deleteStatController);

export const trafficStatsApi = router;
