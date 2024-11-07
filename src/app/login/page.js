'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
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
      
      if (response.data.success) { // Assuming the response has a success flag
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data
        router.push('/user'); // Redirect to user page
        setTimeout(() => {
          window.location.reload(); // Reload page after navigation
        }, 100); // Delay to allow router to finish navigation
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="selection">
      <h2>Đăng Nhập</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="food-select"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="food-select"
      />
      <button onClick={handleLogin} className="login-but">Đăng nhập</button>
      <p>{message}</p>
    </div>
  );
};

export default LoginPage;
