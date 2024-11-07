'use client';
import React, { useEffect, useState } from 'react';

const UserPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user'); // Retrieve user data from localStorage
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set user data
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>; // Loading state while fetching user data
  }

  return (
    <div className="selection">
      <h1>Chào Mừng, {user.username}!</h1>
      <p>Email: {user.email}</p>
      <p>Mặn: {user.man}</p>
      <p>Ngọt: {user.ngot}</p>
      <p>Cay: {user.cay}</p>
      <p>Thức ăn yêu thích: {user.favorite_food}</p>
      {/* Add more user-related content here */}
    </div>
  );
};

export default UserPage;
