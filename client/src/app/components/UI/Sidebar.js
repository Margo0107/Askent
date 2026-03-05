"use client";
import Link from "next/link";
import { MdOutlineReport } from "react-icons/md";
import { HiOutlineHome } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineCreate } from "react-icons/md";
import { usePathname } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const linkClass = (path) =>
    `p-3 py-2 cursor-pointer flex justify-items-center gap-2 rounded-lg cursor-pointer hover:bg-violet-100
  ${
    pathname === path
      ? "font-semibold bg-violet-100 border-r-4 border-violet-600 shadow-[inset_-21px_0_23px_-15px_theme(colors.violet.500)]"
      : "bg-violet-50"
  }`;

  const showAside = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="flex h-screen">
        <RxHamburgerMenu
          size={21}
          onClick={showAside}
          className="md:hidden fixed top-15 z-50 left-5 cursor-pointer"
        />

        <aside
          className={`fixed top-13 left-0 h-screen w-64 flex flex-col justify-between gap-4 p-5 py-10 bg-white/60 border-r-2 border-violet-300 transition-transform duration-300
               ${isOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0`}
        >
          <div className="flex flex-col gap-3">
            {/* link feed */}
            <Link href="/home" className={linkClass("/home")}>
              <HiOutlineHome size={21} />
              Feed
            </Link>
            {/* link create a question */}
            <Link href="/home/create" className={linkClass("/create")}>
              <MdOutlineCreate size={21} />
              Ask Question
            </Link>
            {/* link notification */}
            <Link
              href="/home/>notification"
              className={linkClass("/home/notification")}
            >
              <IoNotificationsOutline size={21} />
              notifications
            </Link>
            {/* link report */}
            <Link href="/home/report" className={linkClass("/home/report")}>
              <MdOutlineReport size={21} />
              Support
            </Link>
          </div>
          <p className="text-xs text-gray-500">
            © 2026 Askent. All rights reserved.
          </p>
        </aside>
      </div>
    </>
  );
}
