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
      setNotification(data);
    };
    load();
  }, []);

  return (
    <div className="w-full max-w-lg flex flex-col gap-4">
      {notification.length > 0 ? (
        notification.map((n) => {
          if (n.type === "like") {
            return (
              <NotifiLikesCard
                key={n._id}
                userName={n.userId?.userName}
                userAvatar={n.userId?.avatar}
                title={n.questionId?.title}
                type="post"
                date={new Date(n.createdAt).toLocaleDateString()}
              />
            );
          }

          if (n.type === "answer") {
            return (
              <NotifiAnswerCard
                key={n._id}
                userName={n.userId?.userName}
                targetUserName={n.targetUserId?.userName}
                userAvatar={n.userId?.avatar}
                questionTitle={n.questionId?.title}
                questionId={n.questionId?._id}
                answerdContent={n.answerId?.content}
                replyCount={n.answerId?.replyCount}
                answerId={n.answerId?._id}
                likes={n.answerId?.likes}
                date={new Date(n.createdAt).toLocaleDateString()}
              />
            );
          }
          if (n.type === "like_answer") {
            return (
              <NotifiLikesCard
                key={n._id}
                userName={n.userId?.userName}
                userAvatar={n.userId?.avatar}
                title={n.answerId?.content}
                type="answer"
                date={new Date(n.createdAt).toLocaleDateString()}
              />
            );
          }
          return null;
        })
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg">пока нет уведомлений... 👀</p>
          <Link
            href="/home/create"
            className="text-lg underline underline-offset-4"
          >
            хотите начать обсуждение?
          </Link>
        </div>
      )}
    </div>
  );
}
