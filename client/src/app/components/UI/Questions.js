"use client";

import Link from "next/link";
import { RiPokerHeartsLine } from "react-icons/ri";
import { RiPokerHeartsFill } from "react-icons/ri";
import { TbMessageCircle } from "react-icons/tb";
import Avatar from "./Avatar";
import { useUser } from "@/app/context/UserContext";

export default function Questions(props) {
  const { q, userId, handleLikes } = props;

  const { user } = useUser();
  if (!q) return null;

  const isLiked =
    userId && q?.likes.some((likeId) => likeId.toString() === userId);

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full flex flex-col justify-between sm:gap-5 gap-3 bg-white/50 backdrop-blur-md sm:p-5 p-4 sm:-py-4 py-3 rounded-lg">
        <div className="flex items-center gap-4">
          <Avatar
            src={q?.authorId?.avatar}
            className={`w-8 h-8 md:w-10 md:h-10`}
          />
          <h3 className="sm:text-xl text-lg cursor-pointer">
            {q?.authorId?.userName}
          </h3>
          <span className="text-sm text-slate-600">
            {q?.createAt && new Date(q?.createAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex flex-col">
          <h1 className="sm:text-2xl text-xl font-semibold p-1 py-2">
            {q?.title}
          </h1>
          <p className="p-1 py-2">{q?.content}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleLikes(q?._id)}
            className="flex gap-2 bg-violet-200 rounded-lg p-3 py-2 cursor-pointer hover:bg-violet-300 transition duration-300"
          >
            {isLiked ? (
              <RiPokerHeartsFill size={23} />
            ) : (
              <RiPokerHeartsLine size={23} />
            )}

            <span>{q?.likes.length || 0}</span>
          </button>

          <div className="flex gap-2 bg-violet-200 rounded-lg p-3 py-2 cursor-pointer hover:bg-violet-300 transition duration-300">
            <Link href={`/home/question/${q?._id}`}>
              <TbMessageCircle size={23} />
            </Link>
            <span>{q?.answerCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
