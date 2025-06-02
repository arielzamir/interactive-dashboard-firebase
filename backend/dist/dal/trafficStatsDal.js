"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStatDal = exports.updateStatDal = exports.addStatDal = exports.getAllStatsDal = void 0;
const firebase_1 = require("../config/firebase");
const collection = firebase_1.db.collection("trafficStats");
const getAllStatsDal = async () => {
    const trafficStats = await collection.get();
    return trafficStats.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
};
exports.getAllStatsDal = getAllStatsDal;
const addStatDal = async (userData) => {
    const newTrafficStat = await collection.add(userData);
    return Object.assign({ id: newTrafficStat.id }, userData);
};
exports.addStatDal = addStatDal;
const updateStatDal = async (userId, userData) => {
    await collection.doc(userId).update(userData);
    return Object.assign({ userId }, userData);
};
exports.updateStatDal = updateStatDal;
const deleteStatDal = async (userId) => {
    await collection.doc(userId).delete();
};
exports.deleteStatDal = deleteStatDal;
//# sourceMappingURL=trafficStatsDal.js.map