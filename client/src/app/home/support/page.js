"use client";
import useSupportApi from "@/app/components/hooks/useSupportApi";
import { useState } from "react";
export default function SuportPage() {
  const [text, setText] = useState("");

  const { postSupport } = useSupportApi();

  const handleSend = async () => {
    if (!text.trim()) return;

    await postSupport(text);

    setText("");
    alert("message send ^_^");
  };
  return (
    <section className="w-full max-w-xl flex flex-col justify-between gap-10 bg-white/50 backdrop-blur-md p-4 md:p-4 xl:p-8 py-5 rounded-lg">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-semibold text-xl">Support</h1>
        <h2 className="text-md text-gray-600 text-center">
          Something not working? Let us know.
        </h2>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="bg-white text-lg w-full p-3 py-2 border-b-3 border-violet-600 focus:outline-none rounded-lg overflow-hidden resize-none"
        placeholder="Describe your issue here..."
      />
      <div className="flex justify-end">
        <button
          onClick={handleSend}
          className="bg-violet-600 hover:bg-violet-400 text-white text-xl p-4 py-2 rounded-lg transition duration-400 cursor-pointer"
        >
          Send Message
        </button>
      </div>
    </section>
  );
}
