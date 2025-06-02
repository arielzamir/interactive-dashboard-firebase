import {Request, Response, NextFunction} from "express";
import * as admin from "firebase-admin";

export interface AuthenticatedRequest extends Request {
  user?: admin.auth.DecodedIdToken;
}

if (!admin.apps.length) {
  admin.initializeApp();
}

export const checkAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ?
    authHeader.split("Bearer ")[1] :
    null;

  if (!token) {
    console.log("No token provided");
    res.status(401).json({message: "Unauthorized: No token provided"});
    return;
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("Decoded token:", decodedToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({message: "Unauthorized: Invalid token"});
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
      return res.status(401).json({message: "Unauthorized: No user found"});
    }

    try {
      const userDoc = await admin
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get();

      if (!userDoc.exists) {
        return res
          .status(403)
          .json({message: "Forbidden: User record not found"});
      }

      const userData = userDoc.data();
      const userRole = userData?.role;

      if (!userRole) {
        return res.status(403).json({message: "Forbidden: No role assigned"});
      }

      if (role === "editor" && userRole !== "editor") {
        return res
          .status(403)
          .json({message: "Forbidden: Editor role required"});
      }

      next();
      return;
    } catch (error) {
      console.error("checkRole error:", error);
      return res.status(500).json({message: "Internal server error"});
    }
  };
};
