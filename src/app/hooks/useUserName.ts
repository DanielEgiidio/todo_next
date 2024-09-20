"use client";
import { useState, useEffect } from "react";

export const useUserName = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const saveUserName = (name: string) => {
    localStorage.setItem("userName", name);
    setUserName(name);
  };

  return { userName, saveUserName };
};
