"use client";

import { RiPokerHeartsFill } from "react-icons/ri";
import Avatar from "@/app/components/UI/Avatar";

export default function NotifiLikesCard({ userName, userAvatar, date, title }) {
  return (
    <>
      <section className="bg-white/50 backdrop-blur-md p-3 py-4 rounded-lg border-t-2 border-violet-400">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            {" "}
            <RiPokerHeartsFill size={33} />
            <Avatar src={userAvatar} className={`w-8 h-8 md:w-10 md:h-10`} />
          </div>
          <div className="flex gap-2 items-center">
            <h2 className="font-semibold">{userName}</h2>
            <p>liked your post</p>
            <span className="text-sm text-slate-600">{date}</span>
          </div>
          <h3 className="text-slate-600 break-words whitespace-pre-wrap">
            {title}
          </h3>
        </div>
      </section>
    </>
  );
}
