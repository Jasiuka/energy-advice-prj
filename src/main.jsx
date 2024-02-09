import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "jotai";
import { jotaiStore } from "./atoms.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={jotaiStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
