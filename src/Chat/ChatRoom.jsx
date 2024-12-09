import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';
import './ChatRoom.css';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Fetch messages in real-time
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    });
    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  // Send a new message
  const sendMessage = async () => {
    if (newMessage.trim()) {
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        user: auth.currentUser ? auth.currentUser.displayName : 'Anonymous',
        userId: auth.currentUser ? auth.currentUser.uid : 'guest',
        timestamp: serverTimestamp(),
      });
      setNewMessage(''); // Clear input
    }
  };

  // Delete a message
  const deleteMessage = async (id) => {
    const messageDoc = doc(db, 'messages', id);
    await deleteDoc(messageDoc);
  };

  return (
    <div className="chatroom-container">
      {/* Header Section with Logo */}
      <div className="chatroom-header">
        <div className="logo-container">
          <img
            src="../image.png"
            alt="Logo"
            className="chatroom-logo"
          />
          <span className="chatroom-title">We Chat</span>
        </div>
      </div>

      <div className="messages">
        {messages.map((msg) => (
          <div key={msg.id} className="message">
            <strong>{msg.user}: </strong>
            <span>{msg.text}</span>
          
            {auth.currentUser && msg.userId === auth.currentUser.uid && (
              <button
                onClick={() => deleteMessage(msg.id)}
                className="delete-btn"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
