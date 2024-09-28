"use client";

import React, { useState, useEffect } from 'react';

function FoodSelection() {
    const [foodList, setFoodList] = useState([]);
    const [filteredFoodList, setFilteredFoodList] = useState([]);
    const [selectedFoods, setSelectedFoods] = useState({
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: ""
    });
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('user');
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            console.error("User ID not found in localStorage");
        }
    }, []);

    // Fetch the list of food when the component mounts
    useEffect(() => {
        if (userId) { // Ensure userId is available before making the request
            fetch(`https://app-cjhj.onrender.com/get_food_list`) 
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
        }
    }, [userId]); 

    // Filter food options based on the day and check value
    useEffect(() => {
        const checkValues = {
            monday: 2,
            tuesday: 3,
            wednesday: 4,
            thursday: 5,
            friday: 6
        };
        
        // Get the selected day from the state
        const day = Object.keys(selectedFoods).find(day => selectedFoods[day] === "");

        // If a day is found, filter the food list based on its check value
        if (day) {
            const checkValue = checkValues[day];
            const filteredFoods = foodList.filter(food => food.check === checkValue);
            setFilteredFoodList(filteredFoods);
        } else {
            // If all days are filled, show all food options
            setFilteredFoodList(foodList);
        }
    }, [foodList, selectedFoods]);

    const handleChange = (day, value) => {
        setSelectedFoods(prevState => ({
            ...prevState,
            [day]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all days have a food selected
        for (let day in selectedFoods) {
            if (!selectedFoods[day]) {
                alert(`Please select food for ${day}!`);
                return;
            }
        }

        // Send the selected food for all days to the backend
        fetch('https://app-cjhj.onrender.com/choose_food', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userId,
                selected_foods: selectedFoods
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
        <div className="selection">
            <h2>Select Your Favorite Food for Each Day</h2>
            <form onSubmit={handleSubmit}>
                {["monday", "tuesday", "wednesday", "thursday", "friday"].map(day => (
                    <div key={day}>
                        <label htmlFor={day}>{day.charAt(0).toUpperCase() + day.slice(1)}:</label>
                        <select
                            id={day}
                            value={selectedFoods[day]}
                            onChange={(e) => handleChange(day, e.target.value)}
                            className="food-select"
                        >
                            <option value="">--Select a Food--</option>
                            {filteredFoodList.map(food => (
                                <option key={food.id} value={food.username}>
                                    {food.name}
                                </option>
                            ))}
                        </select>
                        <br />
                    </div>
                ))}
                <button type="submit" className="submit-but">Submit</button>
            </form>
        </div>
    );
}

export default FoodSelection;
