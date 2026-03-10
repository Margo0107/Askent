"use client";
export const useQuestionApi = () => {
  //post
  const createQuestion = async (data) => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/question/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
    }

    return result;
  };
  //get
  const getQuestions = async () => {
    const res = await fetch("http://localhost:5000/api/question");
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message);
    }
    return result;
  };
  return { createQuestion, getQuestions };
};
