import "./notifications.style.css";
import { useAtom } from "jotai";
import { notificationsAtom } from "../../atoms";
import NotificationComponent from "./notificationComponent";
import { useState } from "react";
const NotificationsList = () => {
  //   const [notifications] = useAtom(notificationsAtom);
  const [notifications] = useAtom(notificationsAtom);

  return (
    <>
      <ul className="notifications-list">
        {notifications.map((notification) => (
          <NotificationComponent
            key={notification.id}
            text={notification.text}
            type={notification.type}
            id={notification.id}
          />
        ))}
      </ul>
    </>
  );
};

export default NotificationsList;
