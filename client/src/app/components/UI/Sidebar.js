"use client";
import Link from "next/link";
import { MdOutlineReport } from "react-icons/md";
import { HiOutlineHome } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineCreate } from "react-icons/md";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useNotificationApi } from "../hooks/useNotificationApi";

export default function Sidebar({ isOpen }) {
  const pathname = usePathname();

  const { getNotificationCount } = useNotificationApi();
  const [countNotifi, setCountNotifi] = useState(0);

  useEffect(() => {
    const load = async () => {
      const data = await getNotificationCount();
      setCountNotifi(data.count);
    };
    load();
  }, []);

  const linkClass = (path) =>
    `p-3 py-2 cursor-pointer flex justify-items-center gap-2 rounded-lg cursor-pointer hover:bg-violet-100
  ${
    pathname === path
      ? "font-semibold bg-violet-100 border-r-4 border-violet-600 shadow-[inset_-21px_0_23px_-15px_theme(colors.violet.500)]"
      : "bg-violet-50"
  }`;

  return (
    <>
      <aside
        className={`fixed md:top-14 top-12 left-0 z-30 h-screen w-64 flex flex-col justify-between p-5 py-10 lg:bg-white/50 bg-white/50 backdrop-blur-md border-r-2 border-violet-300 transition-transform duration-300
               ${isOpen ? "translate-x-0" : "-translate-x-full"}
                xl:translate-x-0`}
      >
        <div className="flex flex-col gap-3">
          {/* link feed */}
          <Link href="/home" className={linkClass("/home")}>
            <HiOutlineHome size={21} />
            Feed
          </Link>
          {/* link create a question */}
          <Link href="/home/create" className={linkClass("/home/create")}>
            <MdOutlineCreate size={21} />
            Ask Question
          </Link>
          {/* link notification */}
          <Link
            href="/home/notification"
            className={linkClass("/home/notification")}
          >
            <IoNotificationsOutline size={21} />
            Notifications
            {countNotifi > 0 && (
              <div className="rounded-full bg-violet-500 text-violet-50 text-sm p-[5px] py-[2px] font-thin">
                {countNotifi > 99 ? "99+" : countNotifi}
              </div>
            )}
          </Link>

          {/* link report */}
          <Link href="/home/support" className={linkClass("/home/support")}>
            <MdOutlineReport size={21} />
            Support
          </Link>
        </div>
        <p className="text-xs text-gray-500">
          © 2026 Askent. All rights reserved.
        </p>
      </aside>
    </>
  );
}
