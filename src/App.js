// src/App.js
import React from "react";
import axios from "axios";
import { firebaseApp } from "./firebase";
import { getMessaging, getToken } from "firebase/messaging";

const App = () => {
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
          "http://13.209.227.116:8080/users/login",
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

export default App;
