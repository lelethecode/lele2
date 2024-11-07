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

    // Mapping of English day names to Vietnamese day names
    const dayNames = {
        monday: "Thứ 2",
        tuesday: "Thứ 3",
        wednesday: "Thứ 4",
        thursday: "Thứ 5",
        friday: "Thứ 6"
    };

    useEffect(() => {
        const storedUserId = localStorage.getItem('user');
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            console.error("User ID not found in localStorage");
        }
    }, []);

    useEffect(() => {
        if (userId) { 
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
            <h2>Chọn món cho từng ngày</h2>
            <form onSubmit={handleSubmit}>
                {["monday", "tuesday", "wednesday", "thursday", "friday"].map(day => (
                    <div key={day}>
                        <label htmlFor={day}>{dayNames[day]}:</label>
                        <select
                            id={day}
                            value={selectedFoods[day]}
                            onChange={(e) => handleChange(day, e.target.value)}
                            className="food-select"
                        >
                            <option value="">--Chọn Món--</option>
                            <option key={'no'} value="khong_an">Không Ăn</option>
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
