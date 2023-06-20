// import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

import App from "./App.jsx";
import "./styles/index.css";
import { GlobalStyle } from "./styles/global";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <>
    <GlobalStyle />
    <App />
  </>
  // </React.StrictMode>
);
