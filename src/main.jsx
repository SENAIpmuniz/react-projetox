import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// Scorm provider
import ScormProvider from "./contexts/Scorm/ScormProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ScormProvider>
            <App />
        </ScormProvider>
    </React.StrictMode>
);
