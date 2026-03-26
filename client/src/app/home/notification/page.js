"use client";

import { useEffect, useState } from "react";
import { useNotificationApi } from "@/app/components/hooks/useNotificationApi";

import NotifiLikesCard from "@/app/components/UI/NotifiLikesCard";
import NotifiAnswerCard from "@/app/components/UI/NotifiAnswerCard";

import Link from "next/link";

export default function NotifyPage() {
  const [notification, setNotification] = useState([]);

  const { getNotification } = useNotificationApi();

  useEffect(() => {
    const load = async () => {
      const data = await getNotification();
      console.log("NOTIFICATIONS:", data);
      setNotification(data);
    };
    load();
  }, []);
  return (
    <>
      <div className="w-full max-w-lg flex flex-col gap-4">
        {notification.length ? (
          notification.map((n) => (
            <div key={n._id}>
              <NotifiLikesCard
                userName={n.userId?.userName}
                userAvatar={n.userId?.avatar}
                title={n.questionId?.title}
                date={new Date(n.createdAt).toLocaleDateString()}
              />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center gap-4">
            {" "}
            <p className="text-lg">пока нет увидомлений... 👀</p>
            <Link
              href="/home/create"
              className="text-lg underline underline-offset-4"
            >
              хотите начать обсужденеи?
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
