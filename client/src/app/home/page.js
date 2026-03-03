"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const router = useRouter;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);
  return (
    <>
      <div className="min-h-screen flex flex-col bg-[url(/bg.jpg)] bg-cover bg-center">
        <header className="px-6 py-2 bg-white/20 backdrop-blur border-b-1 border-violet-300">
          <nav className="flex justify-between items-center">
            <div>
              <h2 className="font-bold text-3xl tracking-[-1.5px]">Askent</h2>
            </div>
            <div className="flex items-center gap-5">
              <Image
                className="rounded-full"
                src="/auth-img.png"
                alt="img-user-avatar"
                width={40}
                height={40}
              />
              <button className="px-4 py-2 bg-violet-600 text-white text-lg rounded-2xl hover:bg-violet-400 transition duration-400 cursor-pointer">
                Logout
              </button>
            </div>
          </nav>
        </header>
        <main>
          <h2 className="text-center mt-5 text-lg">welcome</h2>
        </main>
      </div>
    </>
  );
}
