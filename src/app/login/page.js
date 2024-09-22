// src/LoginPage.jsx

'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Import useRouter

const LoginPage = () => {
  const router = useRouter(); // Initialize the router
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://app-cjhj.onrender.com/login', {
        username: username,
        password: password,
      });
      setMessage(response.data.message);
      
      // Redirect to the user page on successful login
      if (response.data.success) { // Assuming the response has a success flag
        router.push('/user'); // Change '/user' to your actual user page route
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
};

export default LoginPage;
