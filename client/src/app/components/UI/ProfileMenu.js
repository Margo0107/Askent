"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BsFillCameraFill } from "react-icons/bs";

export default function ProfileMenu({ logout }) {
  const [user, setUser] = useState(null);
  const fileInputFef = useRef(null);

  const handleClick = () => {
    fileInputFef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
  };

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/author/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = await res.json();
      setUser(user);
    };
    loadUser();
  }, []);

  return (
    <div className="absolute md:top-14 top-12 md:left-[-150] left-[-80] bg-white shadow-lg rounded-xl md:p-5 p-3 w-40 md:w-50">
      {user && (
        <div kay={user._id} className="flex flex-col items-start gap-2">
          <div className="relative">
            <div className="absolute bottom-0 md:left-8 left-6 bg-violet-600 rounded-full p-1 cursor-pointer">
              {" "}
              <BsFillCameraFill
                size={15}
                onClick={handleClick}
                className="text-white position top-10 md:left-2 left-2 w-3 md:w-5 h-3 md:h-5"
              />
            </div>
            <Image
              src="/auth-img.png"
              alt="avatar"
              width={60}
              height={60}
              onClick={handleClick}
              className="rounded-full w-10 md:w-15 h-10 md:h-15"
            />
          </div>

          <input
            type="file"
            ref={fileInputFef}
            onChange={handleChange}
            className="hidden"
          />

          <h1 className="font-semibold">{user?.userName}</h1>
          <p className="text-sm text-gray-500 text-[13px] md:text-[15px]">{user?.userEmail}</p>
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
