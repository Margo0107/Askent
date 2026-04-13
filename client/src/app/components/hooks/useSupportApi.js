export default function useSupportApi() {
  const postSupport = async (text) => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/support", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: text }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
    }
    return result;
  };
  return { postSupport };
}
