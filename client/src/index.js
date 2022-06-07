import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ContextProvider } from "./components/context/Context";

// By Wrapping APP component in ContextProvider, now all child component of APP has access of Context variable defined in context.js file
ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
