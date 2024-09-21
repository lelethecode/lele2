import React, { useState, useEffect } from 'react';

const FoodSelection = () => {
  const [foodList, setFoodList] = useState([]);

  // Fetch the food list when the component loads
  useEffect(() => {
    fetch('/api/foodlist')
      .then((res) => res.json())
      .then((data) => {
        // Assume 'data' is an array of food objects with 'name' and 'image' fields
        setFoodList(data);
      });
  }, []);

  const handleFoodSelect = (food) => {
    console.log('Selected food:', food);
    // You can implement logic here to handle the selected food
  };

  return (
    <div className="food-selection-page">
      <h1>Chọn Món</h1>
      <div className="food-grid">
        {foodList.map((food) => (
          <div key={food.id} className="food-item" onClick={() => handleFoodSelect(food)}>
            <p>{food.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodSelection;
