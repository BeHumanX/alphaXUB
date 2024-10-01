import React, { useEffect, useRef, useState } from "react";
import Message from "./Message.jsx";
import MessageInput from "./MessageInput.jsx";

const ChatBox = ({ rootUrl }) => {
    const userData = document.getElementById("main").getAttribute("data-user");
    const token = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    axios.defaults.headers.common["X-CSRF-TOKEN"] = token;

    const user = JSON.parse(userData);
    // `App.Models.User.${user.id}`;
    const webSocketChannel = `channel_for_everyone`;

    const [messages, setMessages] = useState([]);
    const scroll = useRef();

    const scrollToBottom = () => {
        scroll.current.scrollIntoView({ behavior: "smooth" });
    };

    const connectWebSocket = () => {
        window.Echo.private(webSocketChannel).listen(
            "GotMessage",
            async (e) => {
                // e.message
                console.log("Received event:", e);
                await getMessages();
            }
        );
    };

    const getMessages = async () => {
        try {
            const token = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content");
            const m = await axios.get(`http://localhost:8000/messages`, {
                headers: {
                    "X-CSRF-TOKEN": token,
                },
                params: {
                    _token: token,
                },
            });
            console.log(`Response: ${m.data}`);
            setMessages(m.data);
            setTimeout(scrollToBottom, 0);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        connectWebSocket();
        getMessages();
        return () => {
            window.Echo.leave(webSocketChannel);
        };
    }, [getMessages]);

    // useEffect(() => {
    //     if (messages.length > 0) {
    //         setTimeout(scrollToBottom, 0);
    //     }
    // }, [messages]);

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header">Chat Box</div>
                    <div
                        className="card-body"
                        style={{ height: "500px", overflowY: "auto" }}
                    >
                        {messages?.map((message) => (
                            <Message
                                key={message.id}
                                userId={user.id}
                                message={message}
                            />
                        ))}
                        <span ref={scroll}></span>
                    </div>
                    <div className="card-footer">
                        <MessageInput rootUrl={rootUrl} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
