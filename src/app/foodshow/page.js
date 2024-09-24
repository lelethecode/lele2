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
    const userId = localStorage.getItem('user_id');

    // Fetch the favorite food from Flask API
    axios.get(`/api/favorite-food?user_id=${userId}`)
      .then(response => {
        setFavoriteFood(response.data);
      })
      .catch(error => {
        console.error("Error fetching favorite food data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Favorite Food for the Week</h1>
      <ul>
        <li>Tuesday (T2): {favoriteFood.t2}</li>
        <li>Wednesday (T3): {favoriteFood.t3}</li>
        <li>Thursday (T4): {favoriteFood.t4}</li>
        <li>Friday (T5): {favoriteFood.t5}</li>
        <li>Saturday (T6): {favoriteFood.t6}</li>
      </ul>
    </div>
  );
};

export default FavoriteFood;
