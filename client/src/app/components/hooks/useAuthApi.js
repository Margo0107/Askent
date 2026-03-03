"use client";
export const useAuthApi = () => {
  const login = async (data) => {
    const res = await fetch("http://localhost:5000/api/author/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
    }
    return result;
  };
  const register = async (data) => {
    const res = await fetch("http://localhost:5000/api/author/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
    }
    return result;
  };
  return { login, register };
};
