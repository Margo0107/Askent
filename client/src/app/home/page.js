"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuestionApi } from "../components/hooks/useQuestionApi";

import { RiPokerHeartsLine } from "react-icons/ri";
import { RiPokerHeartsFill } from "react-icons/ri";
import { TbMessageCircle } from "react-icons/tb";
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();
  const { getQuestions } = useQuestionApi();
  const [questions, setQuestions] = useState([]);
  const [liked, setLikes] = useState({});
  const [likedCount, setLikesCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const loadGetQuestion = async () => {
      const data = await getQuestions();
      setQuestions(data);
      console.log(data);
    };
    loadGetQuestion();
  }, []);

  const handleLikes = (id) => {
    setLikes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <div className="w-full flex flex-col gap-6">
      {questions.map((q) => (
        <div
          key={q._id}
          className="w-full flex flex-col justify-between gap-7 bg-white/50 backdrop-blur-md p-6 py-4 rounded-lg"
        >
          <div className="flex items-center gap-4">
            <Image
              className="rounded-full w-8 h-8 md:w-10 md:h-10"
              src="/auth-img.png"
              alt="icon-profile"
              width={40}
              height={40}
            />
            <h3 className="text-xl cursor-pointer">Admin_01</h3>
            <data className="text-sm text-slate-600">
              {new Date(q.createAt).toLocaleDateString()}
            </data>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold p-1 py-2">{q.title}</h1>
            <p className="p-1 py-2">{q.content}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleLikes(q._id)}
              className="flex gap-2 bg-violet-200 rounded-lg p-3 py-2 cursor-pointer hover:bg-violet-300 transition duration-300"
            >
              {liked[q._id] ? (
                <RiPokerHeartsFill size={23} />
              ) : (
                <RiPokerHeartsLine size={23} />
              )}
              <span>{q.likes}</span>
            </button>

            <div className="flex gap-2 bg-violet-200 rounded-lg p-3 py-2 cursor-pointer hover:bg-violet-300 transition duration-300">
              <TbMessageCircle size={23} />
              <span>{q.answerCount}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
