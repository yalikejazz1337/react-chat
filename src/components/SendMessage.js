import React, { useState, memo, useEffect, useMemo } from "react";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

const SendMessage = ({ scroll, isDM, name }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    const { uid, displayName, photoURL } = auth.currentUser;
    const collectionName = isDM ? "private_messages" : "messages"; // Dynamically select collection
    await addDoc(collection(db, collectionName), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
      // if the collectioname is private_messages, add the receiver's uid
      ...(isDM && { receiver: name }),
    });
    setMessage("");
    scroll.current.scrollIntoView({ behavior: "smooth" });

    //if you havent already, send your name and uid to the data base
    //make the document id the display name
  };

  return (
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder={isDM ? "DM mode" : "public mode"} // Placeholder in JSX for initial render
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;
