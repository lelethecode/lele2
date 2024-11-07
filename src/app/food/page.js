'use client'
import { useState } from "react";

const FoodForm = () => {
    const [username, setUsername] = useState("");
    const [man, setMan] = useState(0);
    const [ngot, setNgot] = useState(0);
    const [cay, setCay] = useState(0);
    const [check,setcheck] = useState(0);
    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            username,
            man,
            ngot,
            cay,
            check,
        }


        console.log(JSON.stringify(data))
        const url = "https://app-cjhj.onrender.com/create_food" //"https://app-cjhj.onrender.com/create_food"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options);
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallback()
        }
    }

    function stoi(settarget,value) {
        let numrifyV = 0;
        //console.log(value)
        
        if(value !== ""){
            numrifyV = parseInt(value, 10);
        }
       
        if (numrifyV >= 100){
            numrifyV = 100;
        }
        else if (numrifyV < 0 || isNaN(numrifyV)) {
            numrifyV = 0;
        }

        //console.log(numrifyV);

        switch(settarget){
            case "man":
                //console.log({numrifyV, settarget})
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

    return (
    
    <div className = "loginhud">
        <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="username" className = "boxtitle">Tên Món Ăn: </label>
                    <br/>
                    <input
                        className = "textbox"
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="man" className = "boxtitle">Độ mặn: </label>
                    <br/>
                    <input
                        className = "textbox"
                        type="number"
                        id="man"
                        value={man}
                        onChange={(e) => stoi(e.target.id, e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="ngot" className = "boxtitle">Độ Ngọt: </label>
                    <br/>
                    <input
                        className = "textbox"
                        type="number"
                        id="ngot"
                        value={ngot}
                        onChange={(e) => stoi(e.target.id, e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="cay" className = "boxtitle">Độ Cay: </label>
                    <br/>
                    <input
                        className = "textbox"
                        type="number"
                        id="cay"
                        value={cay}
                        onChange={(e) => stoi(e.target.id, e.target.value)}
                    />
                </div>
                <br/>
                <button type="submit" className = "buttons" id = "submitbut">Thêm Món Ăn</button>
            </form>
    </div>
    );
};

export default FoodForm