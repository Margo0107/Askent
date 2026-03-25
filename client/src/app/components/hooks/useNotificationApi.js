"use client";

export const useNotificationApi = () => {
  const getNotification = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/notifications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };
  return { getNotification };
};
