import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import App from "./App";

/**
Create a React root to render the App component in the DOM.
@type {ReactDOM.Root}
*/
const root = ReactDOM.createRoot(document.getElementById("root"));

/**
Render the App component in the React root using Strict Mode.
*/
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
