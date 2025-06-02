import {Request, Response} from "express";
import {
  addStatService,
  deleteStatService,
  getAllStatsService,
  updateStatService,
} from "../services/trafficStatsService";

export const getAllStatsController = async (req: Request, res: Response) => {
  try {
    const trafficStats = await getAllStatsService();
    res.status(200).json(trafficStats);
  } catch (error) {
    console.error("Error fetching traffic stats:", error);
    res.status(500).json({error: "Internal server error"});
  }
};

export const addStatController = async (req: Request, res: Response) => {
  try {
    const newTrafficStat = await addStatService(req.body);
    res.status(200).json(newTrafficStat);
  } catch (error) {
    console.error("Error adding a new traffic stat:", error);
    res.status(500).json({error: "Internal server error"});
  }
};

export const updateStatController = async (req: Request, res: Response) => {
  try {
    const updatedTrafficStat = await updateStatService(req.params.id, req.body);
    res.status(200).json(updatedTrafficStat);
  } catch (error) {
    console.error("Error updating traffic stat:", error);
    res.status(500).json({error: "Internal server error"});
  }
};

export const deleteStatController = async (req: Request, res: Response) => {
  try {
    const deletedTrafficStat = await deleteStatService(req.params.id);
    res.status(200).json(deletedTrafficStat);
  } catch (error) {
    console.error("Error deleting traffic stats:", error);
    res.status(500).json({error: "Internal server error"});
  }
};
