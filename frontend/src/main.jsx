import React from "react";
import ReactDOM from "react-dom/client";
import App from "src/App";

import AuthProvider from "auths/contexts/authContext"
import ErrorProvider from "errors/errorContext";
import { RoleProvider } from "components/roles/roleContext";
import { MessageProvider } from "messages/messageContext";

import "src/index.css";


// Suppress warnings in development: wrapping console.warn with a custom function that filters out specific warnings:
const originalWarn = console.warn;
console.warn = (message, ...args) => {
  if (!message.includes("React Router Future Flag Warning")) {
    originalWarn(message, ...args);
  }
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>


    <ErrorProvider>

      <AuthProvider>
        <RoleProvider>
          <MessageProvider>
            <App />
          </MessageProvider>
        </RoleProvider>
      </AuthProvider>

    </ErrorProvider>


  </React.StrictMode>
);
