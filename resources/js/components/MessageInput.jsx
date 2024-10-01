import React, { useState } from "react";

const MessageInput = ({ rootUrl }) => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);

    const messageRequest = async (text) => {
        try {
            const token = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content");
            const response = await axios.post(
                `http://localhost:8000/message`,
                {
                    text,
                },
                {
                    headers: {
                        "X-CSRF-TOKEN": token,
                    },
                }
            );
            console.log(response.data);
            // return response.data;
        } catch (err) {
            setError(err.message);
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() === "") {
            alert("Please enter a message!");
            return;
        }

        messageRequest(message).then((response) => {
            setMessage("");
        }).catch((error) => {
            setError(error.message);
        });
    };

    return (
        <div className="input-group">
            <input
                onChange={(e) => setMessage(e.target.value)}
                autoComplete="off"
                type="text"
                className="form-control"
                placeholder="Message..."
                value={message}
            />
            <div className="input-group-append">
                <button
                    onClick={(e) => sendMessage(e)}
                    className="btn btn-primary"
                    type="button"
                >
                    Send
                </button>
            </div>
            {error && <div style={{ color: "red" }}>{error}</div>}
        </div>
    );
};

export default MessageInput;