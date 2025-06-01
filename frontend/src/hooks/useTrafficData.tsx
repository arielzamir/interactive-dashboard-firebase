import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User as FirebaseUser } from "firebase/auth";
import { TrafficStat } from "../interfaces/TrafficStat.interface";
import { auth } from "../config/firebase";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useTrafficData = () => {
  const [data, setData] = useState<TrafficStat[]>([]);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getToken = async (user: FirebaseUser) => {
    return user.getIdToken();
  };

  const fetchData = useCallback(async (user: FirebaseUser) => {
    try {
      const token = await getToken(user);
      const res = await axios.get(`${API_BASE_URL}/traffic`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data);
      return res.data;
    } catch (err) {
      console.error("Failed to fetch data:", err);
      return null;
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await fetchData(firebaseUser);
      } else {
        setUser(null);
        navigate("/");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [fetchData, navigate]);

  const addEntry = async (entry: { date: string; visits: number }) => {
    if (!user) throw new Error("User not authenticated");
    const token = await getToken(user);
    await axios.post(`${API_BASE_URL}/traffic`, entry, {
      headers: { Authorization: `Bearer ${token}` },
    });
    await fetchData(user);
  };

  const updateEntry = async (id: string, updatedData: any) => {
    if (!user) throw new Error("User not authenticated");
    const token = await getToken(user);
    await axios.put(`${API_BASE_URL}/traffic/${id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    await fetchData(user);
  };

  const deleteEntry = async (id: string) => {
    if (!user) throw new Error("User not authenticated");
    const token = await getToken(user);
    await axios.delete(`${API_BASE_URL}/traffic/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    await fetchData(user);
  };

  return {
    data,
    loading,
    addEntry,
    updateEntry,
    deleteEntry,
  };
};
