import React, { useState } from 'react';
import { auth } from './firebase/firebase';
import { signOut } from 'firebase/auth';
import Login from './login/Login';
import Chatroom from './Chat/ChatRoom';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    signOut(auth).then(() => setUser(null));
  };

  return (
    <div className="app-container">
      {user ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <Chatroom />
        </>
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  );
};

export default App;
