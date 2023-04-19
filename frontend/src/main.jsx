import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// ---------- CSS -----------------//
import "./assets/css/styles.css";
import "./assets/css/normalize.css";
import "./assets/css/stylenav.css";
import "./assets/css/signInUp.css";
import "./assets/css/responsive.css";
import "./assets/css/loader.css";
// --------------------------------//
//  ---------- react time ago -----------------//
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(en)
//  --------------------------------------------//
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
  </>
);
