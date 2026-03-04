"use client";
import Image from "next/image";
export default function Header() {
  return (
    <>
      <header className="px-6 py-2 bg-white/20 backdrop-blur border-b-1 border-violet-300">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/icon_askent.png"
              alt="img-user-avatar"
              width={40}
              height={40}
            />
            <h2 className="font-bold text-3xl tracking-[-1.5px] text-transparent bg-linear-65 from-indigo-800 to-fuchsia-500 bg-clip-text">
              Askent
            </h2>
          </div>
          <div className="flex items-center gap-5">
            <Image
              className="rounded-full"
              src="/auth-img.png"
              alt="icon-profile"
              width={40}
              height={40}
            />
            <button className="px-4 py-2 bg-violet-600 text-white text-lg rounded-2xl hover:bg-violet-400 transition duration-400 cursor-pointer">
              Logout
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
