import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";

const ChatBox = () => {
  const [isDM, setIsDM] = useState(false);
  const [name, setName] = useState("");

  const [messages, setMessages] = useState([]);
  const [private_messages, setPrivateMessages] = useState([]);

  const scroll = useRef();
  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });
    return () => unsubscribe;
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      // Query 1: Current User as receiver
      const q1 = query(
        collection(db, "private_messages"),
        where("receiver", "==", auth.currentUser.displayName),
        orderBy("createdAt", "desc"),
        limit(50)
      );

      // Query 2: Current User as sender
      const q2 = query(
        collection(db, "private_messages"),
        where("name", "==", auth.currentUser.displayName),
        orderBy("createdAt", "desc"),
        limit(50)
      );

      // Fetch results concurrently for efficiency
      const [querySnapshot1] = await Promise.all([getDocs(q1)]);
      const [querySnapshot2] = await Promise.all([getDocs(q2)]);

      // Combine messages
      const fetchedMessages = [];
      querySnapshot1.forEach((doc) =>
        fetchedMessages.push({ ...doc.data(), id: doc.id })
      );
      querySnapshot2.forEach((doc) =>
        fetchedMessages.push({ ...doc.data(), id: doc.id })
      );

      // Sort and store
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      //check for duplicate messages

      setPrivateMessages(sortedMessages);
    };
    fetchData();
    const q = query(
      collection(db, "private_messages") /* your where clauses */
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      fetchData(); // Re-fetch whenever a change occurs
    });
    return () => unsubscribe();
  }, []);

  const allMessages = [...messages, ...private_messages];
  //make sure that there are no dusplciate messages

  allMessages.sort((a, b) => a.createdAt - b.createdAt);
  const uniqueMessages = allMessages.filter(
    (message, index, array) => array.indexOf(message) === index
  );
  const handleDMChange = (name) => {
    setIsDM(!isDM);
    console.log("name: ", name);
    console.log(auth.currentUser.uid);
    //export name to send message
    setName(name);
  };

  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {uniqueMessages?.map((message) => (
          <Message
            key={message.id}
            message={message}
            onDMChange={handleDMChange}
          />
        ))}
      </div>
      {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} isDM={isDM} name={name} />
    </main>
  );
};

export default ChatBox;
