"use client";

import { useUser } from "@/app/context/UserContext";
import Avatar from "./Avatar";
import { RiPokerHeartsLine } from "react-icons/ri";
import { TbMessageCircle } from "react-icons/tb";

export default function NotifiAnswerCard() {
  const { user } = useUser();
  return (
    <>
      <section className="bg-white/50 backdrop-blur-md p-3 py-4 rounded-lg border-t-2 border-violet-400">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            {" "}
            <Avatar src={user?.avatar} className={`w-8 h-8 md:w-10 md:h-10`} />
          </div>
          <div className="flex gap-2 items-center">
            {/* who name */}
            <h2 className="font-semibold">test_123</h2>
            <p>Replying to</p>
            {/* whom to name */}
            <span className="text-violet-600">admin_1</span>
          </div>
          <h3 className="text-slate-600 break-words whitespace-pre-wrap">
            answer title
          </h3>
          <div className="flex items-center gap-3">
            <div className="flex gap-2 bg-violet-300 rounded-lg p-3 py-2 cursor-pointer hover:bg-violet-400 transition duration-300">
              <RiPokerHeartsLine size={23} />
              <span>0</span>
            </div>
            <div className="flex gap-2 bg-violet-300 rounded-lg p-3 py-2 cursor-pointer hover:bg-violet-400 transition duration-300">
              <TbMessageCircle size={23} />
              <span>0</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
