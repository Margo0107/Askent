"use client";
import { useUser } from "@/app/context/UserContext";
import { useEffect, useState } from "react";
import { useNotificationApi } from "@/app/components/hooks/useNotificationApi";
import NotifiLikesCard from "@/app/components/UI/NotifiLikesCard";
export default function NotifyPage() {
  const { user } = useUser();
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
        {notification.map((n) => (
          <div key={n._id}>
            <NotifiLikesCard
              userName={n.userId?.userName}
              userAvatar={n.userId?.avatar}
              title={n.questionId?.title}
              date={new Date(n.createdAt).toLocaleDateString()}
            />
          </div>
        ))}
      </div>
    </>
  );
}
