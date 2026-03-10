"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuestionApi } from "../../components/hooks/useQuestionApi";

export default function CreateQuestion() {
  const [titleAsk, setTitleAst] = useState("");
  const [contentAsk, setContentAsk] = useState("");

  const { createQuestion } = useQuestionApi();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (titleAsk.trim().length === 0) {
      alert("Title is required");
      return;
    }
    try {
      await createQuestion({
        title: titleAsk,
        content: contentAsk,
      });
      setTitleAst("");
      setContentAsk("");
      router.push("/home");
      alert("Question created!");

    } catch (error) {
      if (
        error.message == "token wxpired!" ||
        error.message === "token expired!"
      ) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        router.push("/login");
      }
      console.error("Fetch error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl min-h-[450px] flex flex-col items-center justify-between gap-5 bg-white/50 backdrop-blur-md p-4 md:p-4 xl:p-8 py-5 rounded-lg"
    >
      <h1 className="text-2xl font-semibold">Create post</h1>
      <div className="w-full flex flex-col gap-8">
        <textarea
          value={titleAsk}
          onChange={(e) => setTitleAst(e.target.value)}
          placeholder="title"
          className="bg-white text-lg w-full p-3 py-3 border-b-3 border-violet-600 focus:outline-none rounded-lg overflow-hidden resize-none h-[50px]"
        ></textarea>
        <textarea
          value={contentAsk}
          onChange={(e) => setContentAsk(e.target.value)}
          placeholder="body of the question"
          className="bg-white text-lg w-full p-3 py-2 border-b-3 border-violet-600 focus:outline-none rounded-lg overflow-hidden resize-none"
        ></textarea>
      </div>
      <div className="w-full flex justify-end">
        <button className="bg-violet-600 hover:bg-violet-400 text-white text-xl p-4 py-2 rounded-lg transition duration-400 cursor-pointer">
          post
        </button>
      </div>
    </form>
  );
}
