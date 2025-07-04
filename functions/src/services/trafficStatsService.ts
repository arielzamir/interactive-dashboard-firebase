import {
  addStatDal,
  deleteStatDal,
  getAllStatsDal,
  updateStatDal,
} from "../dal/trafficStatsDal";
import { TrafficStat } from "../types/trafficStat.interface";

export const getAllStatsService = async () => {
  return await getAllStatsDal();
};

export const addStatService = async (userData: TrafficStat) => {
  return await addStatDal(userData);
};

export const updateStatService = async (
  userId: string,
  userData: TrafficStat
) => {
  return await updateStatDal(userId, userData);
};

export const deleteStatService = async (userId: string) => {
  return await deleteStatDal(userId);
};
