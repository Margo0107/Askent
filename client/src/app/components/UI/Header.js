"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProfileMenu from "./ProfileMenu";
import { FiSearch } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import Sidebar from "./Sidebar";
import Avatar from "./Avatar";
import { useUser } from "@/app/context/UserContext";
import SearchModal from "./SearchModal";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpenBurger] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const { user } = useUser();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.push("/login");
  };
  const showAside = () => {
    setIsOpenBurger(!isOpen);
  };
  const showModal = () => {
    setOpenSearch(!openSearch);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 px-6 py-2 bg-white/20 backdrop-blur border-b-1 border-violet-300">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/home" className="cursor-pointer flex">
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
            </Link>
          </div>
          <div className="flex items-center gap-5 relative">
            <RxHamburgerMenu
              size={21}
              onClick={showAside}
              className="xl:hidden visible cursor-pointer"
            />
            {/* search input question */}
            <FiSearch
              onClick={showModal}
              size={30}
              className="cursor-pointer md:w-7 md:h-7 w-6 h-6"
            />

            <button
              className="cursor-pointer"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <Avatar
                src={user?.avatar}
                className="rounded-full w-8 h-8 md:w-10 md:h-10"
              />
            </button>
            {open && <ProfileMenu logout={logout} />}
          </div>
        </nav>
      </header>
      <Sidebar isOpen={isOpen} />
      {openSearch && <SearchModal onClose={() => setOpenSearch(false)} />}
    </>
  );
}
