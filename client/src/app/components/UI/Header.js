"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProfileMenu from "./ProfileMenu";
import { IoIosSearch } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import Sidebar from "./Sidebar";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpenBurger] = useState(false);
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.push("/login");
  };
  const showAside = () => {
    setIsOpenBurger(!isOpen);
  };
  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 px-6 py-2 bg-white/20 backdrop-blur border-b-1 border-violet-300">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <Image
              className="rounded-full w-8 h-8 md:w-10 md:h-10"
              src="/icon_askent.png"
              alt="img-user-avatar"
              width={40}
              height={40}
            />
            <h2 className="font-bold text-2xl lg:text-3xl tracking-[-1.5px] text-transparent bg-linear-65 from-indigo-800 to-fuchsia-500 bg-clip-text">
              Askent
            </h2>
          </div>
          <div className="flex items-center gap-5 relative">
            <RxHamburgerMenu
              size={21}
              onClick={showAside}
              className="xl:hidden visible cursor-pointer"
            />
            {/* search input question */}
            {/* <input
              placeholder="search question"
              className="text-sm p-[8px] w-60 bg-violet-100 border-b-3 border-violet-600 focus:outline-none rounded-sm"
            />
            <IoIosSearch className="absolute top-3 left-53 w-5 h-5 cursor-pointer" /> */}
            <button
              className="cursor-pointer"
              onClick={() => {
                console.log("click");
                setOpen(!open);
              }}
            >
              <Image
                className="rounded-full w-8 h-8 md:w-10 md:h-10"
                src="/auth-img.png"
                alt="icon-profile"
                width={40}
                height={40}
              />
            </button>
            {open && <ProfileMenu logout={logout} />}
          </div>
        </nav>
      </header>
      <Sidebar isOpen={isOpen} />
    </>
  );
}
