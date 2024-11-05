"use client";

import React, { useState, useEffect } from 'react';

function FoodSelection() {
    const [foodList, setFoodList] = useState([]);
    const [filteredFoodLists, setFilteredFoodLists] = useState({
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: []
    });
    const [selectedFoods, setSelectedFoods] = useState({
        no: "",
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
                        // Filter food for each day based on the check value
                        setFilteredFoodLists({
                            no: data.filter(food => food.check === 0),
                            monday: data.filter(food => food.check === 2),
                            tuesday: data.filter(food => food.check === 3),
                            wednesday: data.filter(food => food.check === 4),
                            thursday: data.filter(food => food.check === 5),
                            friday: data.filter(food => food.check === 6)
                        });
                    } else {
                        console.log('No food items found');
                    }
                })
                .catch(error => console.error('There was a problem with the fetch operation:', error));
        }
    }, [userId]);

    const handleChange = (day, value) => {
        setSelectedFoods(prevState => ({
            ...prevState,
            [day]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // // Check if all days have a food selected
        // for (let day in selectedFoods) {
        //     if (!selectedFoods[day]) {
        //         alert(`Please select food for ${day}!`);
        //         return;
        //     }
        // }

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
            <h2>Chọn món cho từng ngày </h2>
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
                            <option value="">--Chọn Món--</option>
                            <option key = {'no'} value='khong_an'>Không Ăn</option>
                            {filteredFoodLists[day].map(food => (
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
