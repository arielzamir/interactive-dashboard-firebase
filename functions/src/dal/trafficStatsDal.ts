import { UpdateData } from "firebase-admin/firestore";
import { db } from "../firebase/admin";
import { TrafficStat } from "../types/trafficStat.interface";

const collection = db.collection("trafficStats");

export const getAllStatsDal = async () => {
  const trafficStats = await collection.get();
  return trafficStats.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addStatDal = async (userData: TrafficStat) => {
  const newTrafficStat = await collection.add(userData);
  return { id: newTrafficStat.id, ...userData };
};

export const updateStatDal = async (userId: string, userData: TrafficStat) => {
  await collection.doc(userId).update(userData as UpdateData<TrafficStat>);
  return { userId, ...userData };
};

export const deleteStatDal = async (userId: string) => {
  await collection.doc(userId).delete();
};
