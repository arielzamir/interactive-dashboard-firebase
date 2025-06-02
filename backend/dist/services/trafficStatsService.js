"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStatService = exports.updateStatService = exports.addStatService = exports.getAllStatsService = void 0;
const trafficStatsDal_1 = require("../dal/trafficStatsDal");
const getAllStatsService = async () => {
    return await (0, trafficStatsDal_1.getAllStatsDal)();
};
exports.getAllStatsService = getAllStatsService;
const addStatService = async (userData) => {
    return await (0, trafficStatsDal_1.addStatDal)(userData);
};
exports.addStatService = addStatService;
const updateStatService = async (userId, userData) => {
    return await (0, trafficStatsDal_1.updateStatDal)(userId, userData);
};
exports.updateStatService = updateStatService;
const deleteStatService = async (userId) => {
    return await (0, trafficStatsDal_1.deleteStatDal)(userId);
};
exports.deleteStatService = deleteStatService;
//# sourceMappingURL=trafficStatsService.js.map