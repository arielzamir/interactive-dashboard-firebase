import { Request, Response, NextFunction } from "express";
import * as admin from "firebase-admin";
import { auth, db } from "../firebase/admin";
import { logger } from "firebase-functions/v2";

export interface AuthenticatedRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

export const checkAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  logger.info("Checking authentication...");
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split("Bearer ")[1]
    : null;

  if (!token) {
    logger.warn("No token provided in the request");
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    logger.info({
      message: "User authenticated successfully",
      userId: req.user?.uid,
    });
    next();
    return;
  } catch (error) {
    logger.error({
      message: "Authentication failed",
      error: error,
    });
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export const checkRole = (role: "viewer" | "editor") => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    logger.info(`Checking role: ${role}`);
    const user = req.user;
    if (!user || !user.uid) {
      logger.warn("No user found in the request");
      res.status(401).json({ message: "Unauthorized: No user found" });
      return;
    }

    try {
      const userDoc = await db.collection("users").doc(user.uid).get();
      const userRole = userDoc.data()?.role;

      if (!userRole) {
        logger.warn("User has no role assigned");
        res.status(403).json({ message: "Forbidden: No role assigned" });
        return;
      }

      if (role === "editor" && userRole !== "editor") {
        logger.warn("User does not have editor role");
        res.status(403).json({ message: "Forbidden: Editor role required" });
        return;
      }

      next();
      return;
    } catch (error) {
      logger.error({
        message: "Error checking user role",
        error: error,
      });
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
