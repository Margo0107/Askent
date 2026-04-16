"use client";

import { useState } from "react";
import { useAnswerApi } from "../hooks/useAnswer";

import { RiPokerHeartsLine } from "react-icons/ri";
import { RiPokerHeartsFill } from "react-icons/ri";
import { TbMessageCircle } from "react-icons/tb";
import Avatar from "./Avatar";
import { BiSolidRightArrow } from "react-icons/bi";

export default function AnswerCard({
  answer,
  answers,
  userId,
  handleLikes,
  questionsId,
  setAnswer,
  getAnswer,
}) {
  const [reply, setReply] = useState("");
  const [showReply, setShowReply] = useState(false);

  const { createAnswer } = useAnswerApi();

  const isLiked =
    userId && answer.likes.some((likeId) => likeId.toString() === userId);

  const sendAnswerd = async () => {
    if (!reply.trim()) return;

    const newReply = await createAnswer(questionsId, {
      content: reply,
      parentAnswerId: answer._id,
    });
    const update = await getAnswer(questionsId);
    setAnswer(update);

    setReply("");
    setShowReply(false);
  };

  const isReply = !!answer.parentAnswerId;

  const parent = answers?.find((a) => a._id === answer.parentAnswerId);

  return (
    <>
      <div
        id={answer._id}
        className={`p-2 rounded-lg bg-violet-100/50 border-t border-violet-300 flex flex-col gap-4 ${isReply ? "ml-4 mt-3 border-l-2" : ""}`}
      >
        <div className="flex items-center gap-x-2 gap-y-2 flex-wrap">
          <Avatar
            src={answer?.authorId?.avatar}
            className={`w-8 h-8 md:w-10 md:h-10`}
          />
          <h3 className="sm:text-xl text-lg cursor-pointer">
            {answer?.authorId?.userName || "user"}
          </h3>
          {isReply && parent && (
            <>
              <BiSolidRightArrow size={14} className="text-violet-800" />
              <span className="text-violet-600">
                {parent?.authorId.userName}
              </span>
            </>
          )}
          <span className="text-sm text-slate-600">
            {new Date(answer.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div>
          <p className="break-words whitespace-pre-wrap">{answer.content}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleLikes(answer._id)}
            className="flex gap-2 bg-violet-300 rounded-lg p-3 py-2 cursor-pointer hover:bg-violet-400 transition duration-300"
          >
            {isLiked ? (
              <RiPokerHeartsFill size={23} />
            ) : (
              <RiPokerHeartsLine size={23} />
            )}

            <span>{answer.likes?.length || 0}</span>
          </button>
          <div>
            <div className="flex gap-2 bg-violet-300 rounded-lg p-3 py-2 cursor-pointer hover:bg-violet-400 transition duration-300">
              <button onClick={() => setShowReply((prev) => !prev)}>
                <TbMessageCircle size={23} />
              </button>
              <span>{answer.replyCount || 0}</span>
            </div>
          </div>
        </div>

        {showReply && (
          <div className="w-full flex  bg-white border-l-3 border-violet-600 rounded-xl overflow-hidden">
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="write reply..."
              className="flex-1 text-lg p-2 py-1 focus:outline-none resize-none h-12"
            />
            <button
              onClick={sendAnswerd}
              className="bg-violet-600 hover:bg-violet-400 text-white text-xl p-4 py-2 border-1 transition duration-400 cursor-pointer"
            >
              send
            </button>
          </div>
        )}
      </div>
    </>
  );
}
