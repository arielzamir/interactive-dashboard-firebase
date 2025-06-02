"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStatController = exports.updateStatController = exports.addStatController = exports.getAllStatsController = void 0;
const trafficStatsService_1 = require("../services/trafficStatsService");
const getAllStatsController = async (req, res) => {
    try {
        const trafficStats = await (0, trafficStatsService_1.getAllStatsService)();
        res.status(200).json(trafficStats);
    }
    catch (error) {
        console.error("Error fetching traffic stats:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getAllStatsController = getAllStatsController;
const addStatController = async (req, res) => {
    try {
        const newTrafficStat = await (0, trafficStatsService_1.addStatService)(req.body);
        res.status(200).json(newTrafficStat);
    }
    catch (error) {
        console.error("Error adding a new traffic stat:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.addStatController = addStatController;
const updateStatController = async (req, res) => {
    try {
        const updatedTrafficStat = await (0, trafficStatsService_1.updateStatService)(req.params.id, req.body);
        res.status(200).json(updatedTrafficStat);
    }
    catch (error) {
        console.error("Error updating traffic stat:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.updateStatController = updateStatController;
const deleteStatController = async (req, res) => {
    try {
        const deletedTrafficStat = await (0, trafficStatsService_1.deleteStatService)(req.params.id);
        res.status(200).json(deletedTrafficStat);
    }
    catch (error) {
        console.error("Error deleting traffic stats:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.deleteStatController = deleteStatController;
//# sourceMappingURL=trafficStatsController.js.map