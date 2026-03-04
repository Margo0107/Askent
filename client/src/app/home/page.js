"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Header from "../components/UI/Header";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }
  }, [router]);
  return (
    <>
      <div className="min-h-screen flex flex-col bg-[url(/bg.jpg)] bg-cover bg-center">
        <Header />
        <main>
          <h2 className="text-center mt-5 text-lg">welcome</h2>
        </main>
      </div>
    </>
  );
}
