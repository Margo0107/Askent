"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BsFillCameraFill } from "react-icons/bs";
import { useAuthApi } from "../hooks/useAuthApi";
import Avatar from "./Avatar";
import { useUser } from "@/app/context/UserContext";

export default function ProfileMenu({ logout }) {
  // const [user, setUser] = useState(null);
  const fileInputFef = useRef(null);
  const { uploadAvatar } = useAuthApi();

  const { user, setUser, loadUser } = useUser();

  const handleClick = () => {
    fileInputFef.current.click();
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      await uploadAvatar(file);
      // Переподгружаем данные пользователя с сервера чтобы убедиться, что аватар сохранился
      await loadUser();
    } catch (error) {
      console.error("Ошибка при загрузке аватара:", error);
    }
  };

  // useEffect(() => {
  //   const loadUser = async () => {
  //     const token = localStorage.getItem("token");
  //     const res = await fetch("http://localhost:5000/api/author/me", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const user = await res.json();
  //     setUser(user);
  //   };
  //   loadUser();
  // }, []);

  return (
    <div className="absolute md:top-14 top-12 md:left-[-80px] lg:left-[-120px] left-[-40px] bg-white shadow-lg rounded-xl md:p-5 p-3 w-40 md:w-50">
      {user && (
        <div key={user._id} className="flex flex-col items-start gap-2">
          <div className="relative">
            <div className="absolute bottom-0 md:left-8 left-6 bg-violet-600 rounded-full p-1 cursor-pointer">
              {" "}
              <BsFillCameraFill
                size={15}
                onClick={handleClick}
                className="text-white position top-10 md:left-2 left-2 w-3 md:w-5 h-3 md:h-5"
              />
            </div>

            <Avatar
              src={user?.avatar}
              onClick={handleClick}
              className="w-10 h-10 md:w-14 md:h-14"
            />
          </div>

          <input
            type="file"
            ref={fileInputFef}
            onChange={handleChange}
            className="hidden"
          />

          <h1 className="font-semibold">{user?.userName}</h1>
          <p className="text-sm text-gray-500 text-[13px] md:text-[15px] break-all">
            {user?.userEmail}
          </p>
          <button
            onClick={logout}
            className="px-3 py-1 bg-violet-600 text-white hover:bg-violet-400 transition duration-400 rounded cursor-pointer"
          >
            logout
          </button>
        </div>
      )}
    </div>
  );
}
