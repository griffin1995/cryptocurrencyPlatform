// Import React core library.
import React from "react";
// Import ReactDOM for DOM-related rendering methods.
import ReactDOM from "react-dom/client";
// Import global CSS styles for the application.
import "./index.scss";
// Import custom Bootstrap Styling
import "./reactCustom.scss";
// Import the main App component to be rendered.
import App from "./App";
import { AuthenticationContextProvider } from "./context/AuthenticationContext";
// Create a root container instance using the element with ID 'root' in the HTML.
// This is where our React app will be mounted.
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component inside the root container in the DOM.
// React.StrictMode is a tool for highlighting potential problems in an application.
// It does not render any visible UI. It activates additional checks and warnings for its descendants.
root.render(
  <React.StrictMode>
    <AuthenticationContextProvider>
      <App />
    </AuthenticationContextProvider>
  </React.StrictMode>
);
