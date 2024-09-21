"use client";

import React, { useState, useEffect } from 'react';

function FoodSelection() {
    const [foodList, setFoodList] = useState([]);
    const [selectedFood, setSelectedFood] = useState("");
    const [userId, setUserId] = useState(1);  // Example user ID, you can fetch this from your app's user state

    // Fetch the list of food when the component mounts
    useEffect(() => {
        fetch('/get_food_list')  // Correct the endpoint to match your Flask route
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.length > 0) {
                    setFoodList(data);
                } else {
                    console.log('No food items found');
                }
            })
            .catch(error => console.error('There was a problem with the fetch operation:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedFood) {
            alert("Please select a food item!");
            return;
        }

        // Send the selected food to the backend
        fetch('/choose_food', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userId,
                food_id: selectedFood
            })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error("Error submitting food selection:", error);
        });
    };

    return (
        <div>
            <h2>Select Your Favorite Food</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="food">Choose Food:</label>
                <select
                    id="food"
                    value={selectedFood}
                    onChange={(e) => setSelectedFood(e.target.value)}
                >
                    <option value="">--Select a Food--</option>
                    {foodList.map(food => (
                        <option key={food.id} value={food.id}>
                            {food.name}
                        </option>
                    ))}
                </select>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default FoodSelection;
