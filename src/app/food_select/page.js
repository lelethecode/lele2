"use client";

import React, { useState, useEffect } from 'react';

function FoodSelection() {
    const [foodList, setFoodList] = useState([]); // Stores all available food items
    const [selectedFoods, setSelectedFoods] = useState([]); // Stores selected food IDs for each day

    // Fetch the list of food when the component mounts
    useEffect(() => {
        fetch('https://app-cjhj.onrender.com/get_food_list')  // Correct the endpoint to match your Flask route
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

    // Handle food selection
    const handleChange = (foodId, dayCheck) => {
        setSelectedFoods(prevState => {
            // Remove food if it's already selected for the same day
            const existing = prevState.find(item => item.foodId === foodId);
            if (existing) {
                return prevState.filter(item => item.foodId !== foodId);
            }

            // Add the selected food to the state
            return [...prevState, { foodId, dayCheck }];
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure at least one food is selected
        if (selectedFoods.length === 0) {
            alert('Please select at least one food item.');
            return;
        }

        // Send selected food and day check values to the backend
        fetch('http://192.168.1.183:5000/choose_food_week', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                selected_foods: selectedFoods  // Send selected food and corresponding check value
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
            <h2>Select Food for Each Day</h2>
            <form onSubmit={handleSubmit}>
                {foodList.map(food => (
                    <div key={food.id}>
                        <label>{food.name}</label>
                        <select
                            onChange={(e) => handleChange(food.id, parseInt(e.target.value))}
                        >
                            <option value="">-- Select Day --</option>
                            <option value="2">Monday</option>
                            <option value="3">Tuesday</option>
                            <option value="4">Wednesday</option>
                            <option value="5">Thursday</option>
                            <option value="6">Friday</option>
                        </select>
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default FoodSelection;
