import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import admin, { credential } from "firebase-admin";

export const app = initializeApp({
  credential: credential.cert("./serviceAccountKey.json"),
});

export const db = admin.firestore();
export const auth = getAuth();
