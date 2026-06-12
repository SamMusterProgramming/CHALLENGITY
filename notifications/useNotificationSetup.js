import { useEffect } from "react";
import {
  useLastNotificationResponse,
  addNotificationResponseReceivedListener,
  addNotificationReceivedListener,
} from "expo-notifications";
import {
  setPendingNotification,
} from "./pendingNotification";
import { setForegroundNotification } from "./foregroundNotificationStore";


export function useNotificationSetup() {
  
  // 🚀 COLD START
  const lastResponse =
    useLastNotificationResponse();
  useEffect(() => {
    if (!lastResponse) return;
    const data =
      lastResponse
      .notification
      .request
      .content
      .data;
    console.log(
      "COLD START:",
      data
    );
    setPendingNotification(data);
  }, [lastResponse]);

  // 🚀 BACKGROUND TAP
  useEffect(() => {
    const subscription =
      addNotificationResponseReceivedListener(
        (response) => {
          const data =
            response
            .notification
            .request
            .content
            .data;
          console.log(
            "BACKGROUND TAP:",
            data
          );
          setPendingNotification(data);
        }
      );
    return () => {
      subscription.remove();
    };

  }, []);

  // 🚀 FOREGROUND NOTIFICATION
  useEffect(() => {
    console.log(
      "REGISTER FOREGROUND LISTENER"
    );
    const subscription =
      addNotificationReceivedListener(
        (notification) => {
          console.log(
            "FOREGROUND EVENT FIRED"
          );
          console.log(
            notification
          );
          const data =
            notification
            .request
            .content
            .data;
          setForegroundNotification({
            title:
              notification
              .request
              .content
              .title,
            body:
              notification
              .request
              .content
              .body,
            data,
          });
        }
      );
    return () => {
      subscription.remove();
    };
  }, []);

}


