import React from "react";
import ReactDom from "react-dom/client";
import ChatBox from "./Chatbox";

if (document.getElementById('main')){
    const rootUrl = "http://localhost:8000";
    ReactDom.createRoot(document.getElementById('main')).render(
        <React.StrictMode>
            <ChatBox rootUrl={rootUrl} />
        </React.StrictMode>
    )
}