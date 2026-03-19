"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useQuestionApi } from "@/app/components/hooks/useQuestionApi";
import { useAnswerApi } from "@/app/components/hooks/useAnswer";
import Questions from "@/app/components/UI/Questions";
import Link from "next/link";

import { BsArrowLeftCircleFill } from "react-icons/bs";
import AnswerCard from "@/app/components/UI/AnswerCard";

export default function AnswerQuestion() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState([]);
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState(null);

  const { likedQuestion, getQuestionById } = useQuestionApi();
  const { createAnswer, getAnswer, likeAnswer } = useAnswerApi();

  //obtaining a user ID
  useEffect(() => {
    const uid = localStorage.getItem("userId");
    if (uid) {
      setUserId(uid);
    }
  }, []);

  //getting a post using his ID
  useEffect(() => {
    const loadQuestionId = async () => {
      const data = await getQuestionById(id);
      setQuestion(data);
    };
    if (id) loadQuestionId();
  }, [id]);

  const handleSend = async () => {
    if (!content.trim()) return;

    const newAnswer = await createAnswer(id, {
      content: content,
    });
    setAnswer((prev) => [...prev, newAnswer]);

    setQuestion((prev) => ({
      ...prev,
      answerCount: (prev.answerCount || 0) + 1,
    }));

    setContent("");
  };

  //getting likes by updating them
  const handleLikes = async (id) => {
    const updateLikeQuestion = await likedQuestion(id);
    setQuestion(updateLikeQuestion);
  };
  //get likes answerd
  const handleLikesAnswerd = async (id) => {
    const update = await likeAnswer(id);

    setAnswer((prev) => prev.map((a) => (a._id === id ? update : a)));
  };

  useEffect(() => {
    const loadAnswer = async () => {
      const data = await getAnswer(id);
      setAnswer(data);
    };
    if (id) loadAnswer();
  }, [id]);

  return (
    <div className="w-full flex flex-col justify-between gap-11 bg-white/60 backdrop-blur-md p-4 py-5 rounded-lg">
      <Link href="/home">
        <BsArrowLeftCircleFill className="text-violet-500 w-8 h-8 transition duration-300 hover:text-violet-400" />
      </Link>

      <section>
        <Questions q={question} userId={userId} handleLikes={handleLikes} />
      </section>

      <section className="w-full flex bg-white border-l-3 border-violet-600 rounded-xl overflow-hidden">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="write your answer..."
          className="flex-1 text-lg p-2 py-1 focus:outline-none resize-none"
        />
        <button
          onClick={handleSend}
          className="bg-violet-600 hover:bg-violet-400 text-white text-xl p-4 py-2 border-1 transition duration-400 cursor-pointer"
        >
          send
        </button>
      </section>

      <section className="flex flex-col gap-4">
        {answer.map((a) => (
          <AnswerCard
            key={a._id}
            answer={a}
            userId={userId}
            handleLikes={handleLikesAnswerd}
            questionsId={id}
            setAnswer={setAnswer}
          />
        ))}
      </section>
    </div>
  );
}
