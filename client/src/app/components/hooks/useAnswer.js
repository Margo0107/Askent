import Questions from "../UI/Questions";

export const useAnswerApi = () => {
  //post
  const createAnswer = async (id, data) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:5000/api/answer/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
  const getAnswer = async (id) => {
    const res = await fetch(`http://localhost:5000/api/answer/${id}`);
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message);
    }
    return result;
  };

  //post like answer
  const likeAnswer = async (id) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:5000/api/answer/${id}/like`, {
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

  return { createAnswer, getAnswer, likeAnswer };
};
