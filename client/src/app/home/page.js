"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuestionApi } from "../components/hooks/useQuestionApi";
import Questions from "../components/UI/Questions";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();
  const { getQuestions, likedQuestion } = useQuestionApi();

  const [questions, setQuestions] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      setUserId(id);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const loadGetQuestion = async () => {
      try {
        const data = await getQuestions();
        setQuestions(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadGetQuestion();
  }, []);

  const handleLikes = async (id) => {
    const updateLikeQuestion = await likedQuestion(id);

    setQuestions((prev) =>
      prev.map((q) => (q._id === id ? updateLikeQuestion : q)),
    );
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {questions.length ? (
        questions.map((q) => (
          <Questions
            key={q._id}
            q={q}
            userId={userId}
            handleLikes={handleLikes}
          />
        ))
      ) : (
        <div className="flex flex-col items-center gap-4">
          {" "}
          <p className="text-lg">пока нет вопросов... 👀</p>
          <Link
            href="/home/create"
            className="text-lg underline underline-offset-4"
          >
            хотите начать обсужденеи?
          </Link>
        </div>
      )}
    </div>
  );
}
