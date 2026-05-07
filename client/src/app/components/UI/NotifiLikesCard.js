"use client";

import { RiPokerHeartsFill } from "react-icons/ri";
import Avatar from "@/app/components/UI/Avatar";

export default function NotifiLikesCard({
  userName,
  userAvatar,
  date,
  title,
  type,
}) {
  return (
    <>
      <section className="bg-white/50 backdrop-blur-md p-3 py-4 rounded-lg border-t-2 border-violet-400">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            {" "}
            <RiPokerHeartsFill size={33} />
            <Avatar src={userAvatar} className={`w-8 h-8 md:w-10 md:h-10`} />
          </div>
          <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
            <h2 className="md:text-lg text-sm font-semibold">{userName}</h2>

            <p>liked your {type === "answer" ? "answer" : "post"}</p>
            <span className="text-slate-600 md:text-sm text-xs">{date}</span>
          </div>
          <h3 className="text-slate-600 wrap-break-word whitespace-pre-wrap">
            {title}
          </h3>
        </div>
      </section>
    </>
  );
}
