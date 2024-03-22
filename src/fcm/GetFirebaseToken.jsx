import React, { useEffect } from "react";
import axios from "axios";
import { firebaseApp } from "./firebase";
import { getMessaging, onMessage, getToken } from "firebase/messaging";

const GetFirebaseToken = () => {
  useEffect(() => {
    const messaging = getMessaging(firebaseApp);

    const handleForegroundMessage = async (payload) => {
      console.log("Foreground Message received. ", payload);
      // 알림을 직접 처리하는 로직을 여기에 추가합니다.
    };

    const unsubscribe = onMessage(messaging, handleForegroundMessage);

    return () => {
      unsubscribe();
    };
  }, []);

  const sendTokenToServer = async () => {
    try {
      const messaging = getMessaging(firebaseApp);
      const currentToken = await getToken(messaging, {
        vapidKey:
          "BFZ7YxE9EWYjsUoDXz6RUqS20dncoD_ZpOpvqywQpTSWuLqaDsW2_ttCFo7ZUmvETmohzwubLRUsbbQ4hj61tvA",
      });

      if (currentToken) {
        console.log("Current Token:", currentToken);

        const response = await axios.post(
          "https://ajou-event.shop/users/login",
          {
            email: "johndoe@example.com",
            password: "Password123",
            token: currentToken,
          }
        );
        console.log("Server Response:", response.data);
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    } catch (error) {
      console.error(
        "An error occurred while sending the token to the server:",
        error
      );
    }
  };

  return (
    <div>
      <button onClick={sendTokenToServer}>Test</button>
    </div>
  );
};

export default GetFirebaseToken;
