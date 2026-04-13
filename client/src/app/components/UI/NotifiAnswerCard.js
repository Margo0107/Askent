"use client";

import Avatar from "./Avatar";
import { RiPokerHeartsLine } from "react-icons/ri";
import { TbMessageCircle } from "react-icons/tb";

import { RiPokerHeartsFill } from "react-icons/ri";
import { useAnswerApi } from "@/app/components/hooks/useAnswer";
import { useState } from "react";
import { useUser } from "@/app/context/UserContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function NotifiAnswerCard(props) {
  const {
    userName,
    targetUserName,
    userAvatar,
    questionTitle,
    answerdContent,
    replyCount,
    questionId,
    answerId,
    likes,
    date,
  } = props;

  const { likeAnswer } = useAnswerApi();
  const { user } = useUser();


  const [localLikes, setLocalLikes] = useState(likes || []);
  const isLiked = user
    ? localLikes.some((id) => id.toString() === user._id)
    : false;

  const handleLikes = async () => {
    const updated = await likeAnswer(answerId);
    setLocalLikes(updated.likes || []);
  };
  return (
    <>
      <section className="bg-white/50 backdrop-blur-md p-3 py-4 rounded-lg border-t-2 border-violet-400">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            {" "}
            <Avatar src={userAvatar} className={`w-8 h-8 md:w-10 md:h-10`} />
            <div className="flex gap-x-2 gap-y-1 items-center flex-wrap">
              {/* who name */}
              <h2 className="md:text-lg text-sm font-semibold">{userName}</h2>
              <p className="text-slate-600 md:text-base text-sm">Replying to</p>
              {/* whom to name */}
              <span className="text-violet-600">{targetUserName}</span>
              <p className="text-slate-600 md:text-sm text-xs">{date}</p>
            </div>
          </div>
          <div className="flex items-center flex-wrap gap-2">
            {" "}
            <p className="md:text-2sm text-xs uppercase text-gray-400 whitespace-nowrap">your question</p>
            <h3 className="text-violet-600 text-sm break-words whitespace-pre-wrap">
              {questionTitle}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <p className="md:text-2sm text-xs uppercase text-gray-400 whitespace-nowrap">Answer</p>
            <h3 className="font-medium break-words whitespace-pre-wrap">
              {answerdContent}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleLikes}
              className="flex gap-2 bg-violet-300 rounded-lg p-3 py-2 cursor-pointer hover:bg-violet-400 transition duration-300"
            >
              {isLiked ? (
                <RiPokerHeartsFill size={23} />
              ) : (
                <RiPokerHeartsLine size={23} />
              )}

              <span>{localLikes.length}</span>
            </button>

            <Link
              href={`/home/question/${questionId}?answerId=${answerId}`}
              className="flex gap-2 bg-violet-300 rounded-lg p-3 py-2 cursor-pointer hover:bg-violet-400 transition duration-300"
            >
              {" "}
              <TbMessageCircle size={23} />
              <span>{replyCount}</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
