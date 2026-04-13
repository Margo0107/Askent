"use client";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useQuestionApi } from "../hooks/useQuestionApi";
import Link from "next/link";
export default function SearchModal({ onClose }) {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const { getSearchQueston } = useQuestionApi();

  const handleSearch = async (value) => {
    setSearch(value);

    if (!value.trim()) {
      setResult([]);
      return;
    }
    const data = await getSearchQueston(value);
    setResult(data);
  };
  return (
    <>
      <section
        onClick={onClose}
        className="fixed inset-0 z-50 flex justify-center items-start bg-blue-800/30 backdrop-blur-sm pt-10"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full pb-6 sm:max-w-md md:max-w-xl max-w-xs shadow-lg overflow-hidden bg-white rounded-lg"
        >
          <div className="flex items-center gap-2 p-3 py-1 border-b border-violet-400">
            <FiSearch className="text-gray-400" size={20} />
            <input
              autoFocus
              type="search"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full outline-none text-lg placeholder-gray-400"
            />
          </div>
          {result.length > 0 ? (
            result.map((q) => (
              <Link
                key={q._id}
                href={`/home/question/${q._id}`}
                onClick={onClose}
              >
                <div className="p-5 py-2 hover:bg-gray-100 border-b-1 border-violet-300 cursor-pointer">
                  <h3 className="md:text-base text-sm">{q.title}</h3>
                  <p className="hover:bg-gray-100 md:text-sm text-xs">
                    {q.content}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-4 border-b border-violet-400">
              <p>find the question</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
