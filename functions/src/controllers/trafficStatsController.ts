import { Request, Response } from "express";
import { logger } from "firebase-functions/v2";
import {
  addStatService,
  deleteStatService,
  getAllStatsService,
  updateStatService,
} from "../services/trafficStatsService";

export const getAllStatsController = async (req: Request, res: Response) => {
  try {
    const trafficStats = await getAllStatsService();
    logger.info({
      message: "Fetched all traffic stats successfully",
      statsCount: trafficStats.length,
    });
    res.status(200).json(trafficStats);
  } catch (error) {
    logger.error({
      error: error,
      message: "Error fetching traffic stats",
    });
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addStatController = async (req: Request, res: Response) => {
  try {
    const newTrafficStat = await addStatService(req.body);
    logger.info({
      message: "Added a new traffic stat successfully",
      statId: newTrafficStat.id,
    });
    res.status(200).json(newTrafficStat);
  } catch (error) {
    logger.error({
      error: error,
      message: "Error adding a new traffic stat",
    });
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateStatController = async (req: Request, res: Response) => {
  try {
    const updatedTrafficStat = await updateStatService(req.params.id, req.body);
    logger.info({
      message: "Updated traffic stat successfully",
      userId: updatedTrafficStat.userId,
    });
    res.status(200).json(updatedTrafficStat);
  } catch (error) {
    logger.error({
      error: error,
      message: "Error updating traffic stat",
    });
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteStatController = async (req: Request, res: Response) => {
  try {
    const deletedTrafficStat = await deleteStatService(req.params.id);
    logger.info({
      message: "Deleted traffic stat successfully",
      userId: req.params.id,
    });
    res.status(200).json(deletedTrafficStat);
  } catch (error) {
    logger.error({
      error: error,
      message: "Error deleting traffic stat",
    });
    res.status(500).json({ error: "Internal server error" });
  }
};
