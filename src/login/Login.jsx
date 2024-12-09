import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import './Login.css';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  // Check password strength
  const checkPasswordStrength = (password) => {
    const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (password.length < 8) {
      setPasswordStrength('Password must be at least 8 characters.');
    } else if (!strongPasswordRegex.test(password)) {
      setPasswordStrength('Password must include at least one letter, one number, and one special character.');
    } else {
      setPasswordStrength('Password is strong.');
    }
  };

  const handleEmailLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error('Login Error:', error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error('Google Login Error:', error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error('Signup Error:', error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1><i className="fas fa-comments"></i> My Chatting App</h1>
        <p className="subtitle">Connect with friends, anytime, anywhere!</p>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              checkPasswordStrength(e.target.value);
            }}
            />
          <i 
            className={`fas ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`} 
            onClick={togglePasswordVisibility}
            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
          /> 
        </div>
        <p className={`password-strength ${passwordStrength === 'Password is strong.' ? 'strong' : ''}`}>
          {passwordStrength}
        </p>
        <button onClick={handleEmailLogin} className="btn primary-btn">
          <i className="fas fa-sign-in-alt"></i> Login
        </button>
        <button onClick={handleSignUp} className="btn secondary-btn">
          <i className="fas fa-user-plus"></i> Sign Up
        </button>
        <button onClick={handleGoogleLogin} className="btn google-btn">
          <i className="fab fa-google"></i> Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
