import React, { useState } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import SendMessage from "./SendMessage";

const Message = ({ message, onDMChange }) => {
  const [user] = useAuthState(auth);

  return (
    <div
      className={`chat-bubble ${
        message.name === user.displayName ? "right" : ""
      }`}
    >
      <img
        className="chat-bubble__left"
        src={message.avatar}
        alt="user avatar"
      />
      <div className="chat-bubble__right">
        <button className="pm" onClick={() => onDMChange(message.name)}>
          <p className="user-name">{message.name}</p>
        </button>
        <p className="user-message">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
