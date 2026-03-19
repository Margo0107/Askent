"use client";
export const useQuestionApi = () => {
  //sending post creation
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
  //getting a liked post
  const likedQuestion = async (id) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:5000/api/question/${id}/like`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
    }
    return result;
  };
  //receiving the creation of posts
  const getQuestions = async () => {
    const res = await fetch("http://localhost:5000/api/question");
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message);
    }
    return result;
  };

  const getQuestionById = async (id) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:5000/api/question/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(result.message);
    }
    return data;
  };
  return { createQuestion, likedQuestion, getQuestions, getQuestionById };
};
