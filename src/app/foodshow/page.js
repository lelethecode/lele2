// src/pages/FavoriteFood.jsx
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FavoriteFood = () => {
  const [favoriteFood, setFavoriteFood] = useState({
    t2: null,
    t3: null,
    t4: null,
    t5: null,
    t6: null,
  });
  
  useEffect(() => {
    // Assuming user ID is stored in localStorage or passed through a session
    const user = localStorage.getItem('user');
    const user_json = JSON.parse(user)

    // Fetch the favorite food from Flask API
    axios.get(`https://app-cjhj.onrender.com/favorite-food?user_id=${user_json.id}`)
      .then(response => {
        setFavoriteFood(response.data);
      })
      .catch(error => {
        console.error("Error fetching favorite food data:", error);
      });
  }, []);

  return (
    <div className="selection">
      <h1> Món ăn yêu thích của bạn trong tuần </h1>
      <ul>
        <li>Thứ 2 (T2): {favoriteFood.t2}</li>
        <li>Thứ 3 (T3): {favoriteFood.t3}</li>
        <li>Thứ 4 (T4): {favoriteFood.t4}</li>
        <li>Thứ 5 (T5): {favoriteFood.t5}</li>
        <li>Thứ 6 (T6): {favoriteFood.t6}</li>
      </ul>
    </div>
  );
};

export default FavoriteFood;
