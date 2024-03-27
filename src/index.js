import React from "react";
import { createRoot } from "react-dom/client"; // 수정된 부분
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = createRoot(document.getElementById("root")); // 수정된 부분
root.render(<App />);

reportWebVitals();
