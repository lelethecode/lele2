import React, { useState, useEffect } from 'react';

const ChooseFood = () => {
    const [foodList, setFoodList] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);

    // Fetch food list from backend
    useEffect(() => {
        fetch('/foodlist')  // Adjust endpoint based on your setup
            .then(response => response.json())
            .then(data => setFoodList(data))
            .catch(error => console.error('Error fetching food list:', error));
    }, []);

    const handleFoodSelection = (food) => {
        setSelectedFood(food);
        // Additional logic to handle the selection, like sending it to the backend
        // to update the user's favorite food.
    };

    return (
        <div>
            <h1>Select Your Favorite Food</h1>
            <div className="food-list">
                {foodList.map(food => (
                    <div key={food.id} className="food-item" onClick={() => handleFoodSelection(food)}>
                        <img src={food.image_url} alt={food.name} className="food-image" />
                        <p>{food.name}</p>
                    </div>
                ))}
            </div>
            {selectedFood && (
                <div className="selected-food">
                    <h2>You selected: {selectedFood.name}</h2>
                </div>
            )}
        </div>
    );
};

export default ChooseFood;
