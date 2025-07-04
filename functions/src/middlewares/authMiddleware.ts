import { Request, Response, NextFunction } from "express";
import * as admin from "firebase-admin";
import { auth, db } from "../firebase/admin";

export interface AuthenticatedRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

export const checkAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split("Bearer ")[1]
    : null;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    return next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export const checkRole = (role: "viewer" | "editor") => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const user = req.user;
    if (!user || !user.uid) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    try {
      const userDoc = await db.collection("users").doc(user.uid).get();
      const userRole = userDoc.data()?.role;

      if (!userRole) {
        return res.status(403).json({ message: "Forbidden: No role assigned" });
      }

      if (role === "editor" && userRole !== "editor") {
        return res
          .status(403)
          .json({ message: "Forbidden: Editor role required" });
      }

      next();
      return;
    } catch (error) {
      console.error("checkRole error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
};
