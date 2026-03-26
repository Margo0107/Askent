"use client";

import { useContext, createContext, useState, useEffect } from "react";

const UserContxt = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loadUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch("http://localhost:5000/api/author/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setUser(data);
  };

  useEffect(() => {
    loadUser();
  }, []);
  return (
    <UserContxt.Provider value={{ user, setUser, loadUser }}>
      {children}
    </UserContxt.Provider>
  );
};
export const useUser = () => useContext(UserContxt);
