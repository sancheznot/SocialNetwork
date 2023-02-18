import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Helmet } from "react-helmet";
// ---------- CSS -----------------//
import "./assets/css/styles.css";
import "./assets/css/normalize.css";
import "./assets/css/stylenav.css";
import "./assets/css/signInUp.css";
import "./assets/css/responsive.css";
import "./assets/css/loader.css";
// --------------------------------//

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
    <Helmet>
      <script
        src="src/assets/js/scriptnav.js"
        type="text/javascript"
      />
    </Helmet>
  </>
);
