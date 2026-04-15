"use client";
export const useAuthApi = () => {
  const login = async (data) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/author/login`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
    }
    return result;
  };
  const register = async (data) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/author/register`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
    }
    return result;
  };

  const uploadAvatar = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    const token = localStorage.getItem("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/author/upload-avatar`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
    }
    return result;
  };
  return { login, register, uploadAvatar };
};
