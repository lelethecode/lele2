"use client";

import React, { useState } from 'react';
import axios from 'axios';

const RandomFood = () => {
  const [randomFood, setRandomFood] = useState(null);

  const handleRandomFood = async () => {
    try {
      const response = await axios.get('https://app-cjhj.onrender.com/random_food');
      setRandomFood(response.data);
    } catch (error) {
      console.error("Error fetching random food:", error);
    }
  };

  return (
    <div>
      <button onClick={handleRandomFood}>Khám phá ngẫu nhiên</button>

      {randomFood && (
        <div style={{ marginTop: '20px' }}>
          <h3>{randomFood.name}</h3>
          <p>{randomFood.description}</p>
          <img src={randomFood.image_url} alt={randomFood.name} style={{ width: '200px', height: 'auto' }} />
        </div>
      )}
    </div>
  );
};

export default RandomFood;
