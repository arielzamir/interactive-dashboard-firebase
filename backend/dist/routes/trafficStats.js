"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trafficStatsApi = void 0;
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const trafficStatsController_1 = require("../controllers/trafficStatsController");
// eslint-disable-next-line new-cap
const router = (0, express_1.Router)();
router.use((0, cors_1.default)({ origin: true }));
router.use(authMiddleware_1.checkAuth);
router.get("/traffic", trafficStatsController_1.getAllStatsController);
router.post("/traffic", (0, authMiddleware_1.checkRole)("editor"), trafficStatsController_1.addStatController);
router.put("/traffic/:id", (0, authMiddleware_1.checkRole)("editor"), trafficStatsController_1.updateStatController);
router.delete("/traffic/:id", (0, authMiddleware_1.checkRole)("editor"), trafficStatsController_1.deleteStatController);
exports.trafficStatsApi = router;
//# sourceMappingURL=trafficStats.js.map