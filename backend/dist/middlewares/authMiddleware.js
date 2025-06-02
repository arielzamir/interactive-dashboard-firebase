"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = exports.checkAuth = void 0;
const admin = __importStar(require("firebase-admin"));
if (!admin.apps.length) {
    admin.initializeApp();
}
const checkAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ?
        authHeader.split("Bearer ")[1] :
        null;
    if (!token) {
        console.log("No token provided");
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
    }
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        console.log("Decoded token:", decodedToken);
        req.user = decodedToken;
        next();
    }
    catch (error) {
        console.error("Auth error:", error);
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
exports.checkAuth = checkAuth;
const checkRole = (role) => {
    return async (req, res, next) => {
        const user = req.user;
        if (!user || !user.uid) {
            return res.status(401).json({ message: "Unauthorized: No user found" });
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
                    .json({ message: "Forbidden: User record not found" });
            }
            const userData = userDoc.data();
            const userRole = userData === null || userData === void 0 ? void 0 : userData.role;
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
        }
        catch (error) {
            console.error("checkRole error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };
};
exports.checkRole = checkRole;
//# sourceMappingURL=authMiddleware.js.map