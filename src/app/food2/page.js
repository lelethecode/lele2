'use client'
import { useState } from "react";

const FoodForm = () => {
    const [username, setUsername] = useState("");
    const [man, setMan] = useState(0);
    const [ngot, setNgot] = useState(0);
    const [cay, setCay] = useState(0);
    const [check, setCheck] = useState(0);
    const [des, setDes] = useState("");  // New state for description
    const [ima, setIma] = useState("");  // New state for image URL
    const [randomFood, setRandomFood] = useState(null);  // To store random food item after fetching
    const [isFoodAdded, setIsFoodAdded] = useState(false);  // Track whether a food item was successfully added

    // Submit food form
    const onSubmit = async (e) => {
        e.preventDefault();

        const data = {
            username,
            man,
            ngot,
            cay,
            check,
            des,  // Include description in the data
            ima   // Include image URL in the data
        };

        const url = "https://app-cjhj.onrender.com/create_food";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(url, options);
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json();
            alert(data.message);
        } else {
            setIsFoodAdded(true);  // Food was successfully added
            fetchRandomFood();  // Fetch a random food after adding the food
        }
    };

    // Function to convert string to integer with constraints
    function stoi(settarget, value) {
        let numrifyV = 0;
        if(value !== "") {
            numrifyV = parseInt(value, 10);
        }

        if (numrifyV >= 100){
            numrifyV = 100;
        } else if (numrifyV < 0 || isNaN(numrifyV)) {
            numrifyV = 0;
        }

        switch(settarget) {
            case "man":
                setMan(numrifyV);
                break;
            case "ngot":
                setNgot(numrifyV);
                break;
            case "cay":
                setCay(numrifyV);
                break;
        }
    }

    // Fetch random food after adding a new one
    const fetchRandomFood = async () => {
        const url = "https://app-cjhj.onrender.com/random_food";  // Create this endpoint on your backend
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
            setRandomFood(data);  // Set the random food item in state
        } else {
            alert("Error fetching random food");
        }
    };

    return (
        <div className="loginhud">
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="username" className="boxtitle">Tên Món Ăn: </label>
                    <br />
                    <input
                        className="textbox"
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="man" className="boxtitle">Độ mặn: </label>
                    <br />
                    <input
                        className="textbox"
                        type="number"
                        id="man"
                        value={man}
                        onChange={(e) => stoi(e.target.id, e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="ngot" className="boxtitle">Độ Ngọt: </label>
                    <br />
                    <input
                        className="textbox"
                        type="number"
                        id="ngot"
                        value={ngot}
                        onChange={(e) => stoi(e.target.id, e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="cay" className="boxtitle">Độ Cay: </label>
                    <br />
                    <input
                        className="textbox"
                        type="number"
                        id="cay"
                        value={cay}
                        onChange={(e) => stoi(e.target.id, e.target.value)}
                    />
                </div>

                {/* New description field */}
                <div>
                    <label htmlFor="des" className="boxtitle">Mô tả: </label>
                    <br />
                    <textarea
                        className="textbox"
                        id="des"
                        value={des}
                        onChange={(e) => setDes(e.target.value)}
                    />
                </div>

                {/* New image URL field */}
                <div>
                    <label htmlFor="ima" className="boxtitle">URL Hình Ảnh: </label>
                    <br />
                    <input
                        className="textbox"
                        type="text"
                        id="ima"
                        value={ima}
                        onChange={(e) => setIma(e.target.value)}
                    />
                </div>
                <br />
                <button type="submit" className="buttons" id="submitbut">Thêm Món Ăn</button>
            </form>

            {/* Display Random Food if it is fetched */}
            {randomFood && isFoodAdded && (
                <div>
                    <h2>Food Added Successfully!</h2>
                    <h3>Here is a random food:</h3>
                    <p><strong>Tên Món Ăn:</strong> {randomFood.username}</p>
                    <p><strong>Độ Mặn:</strong> {randomFood.man}</p>
                    <p><strong>Độ Ngọt:</strong> {randomFood.ngot}</p>
                    <p><strong>Độ Cay:</strong> {randomFood.cay}</p>
                    <p><strong>Mô Tả:</strong> {randomFood.des}</p>  {/* Show description */}
                    <img src={randomFood.ima} alt={randomFood.username} />  {/* Show image */}
                </div>
            )}
        </div>
    );
};

export default FoodForm;
