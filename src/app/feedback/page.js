"use client";

import React, { useState, useEffect } from 'react';

function Feedback() {
    const [userId, setUserId] = useState(null);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        const storedUserId = localStorage.getItem('user');
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            console.error("User ID not found in localStorage");
        }
    }, []);

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!feedback) {
            alert("Please provide your feedback!");
            return;
        }

        // Send feedback to the backend
        fetch('https://app-cjhj.onrender.com/submit_feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userId,
                feedback: feedback
            })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            setFeedback(''); 
        })
        .catch(error => {
            console.error("Error submitting feedback:", error);
        });
    };

    return (
        <div className="feedback">
            <h2 className="feed-com">Nhập Phản Hồi</h2>
            <form onSubmit={handleSubmit}>
                <div className ="feed-con">
                    <label htmlFor="feedback" className = "feed-title">Ý kiến của bạn:</label>
                    <textarea
                        id="feedback"
                        value={feedback}
                        onChange={handleFeedbackChange}
                        placeholder="Phản hồi của bạn..."
                        rows="4"
                        required
                        className="feed-sheet"
                    />
                </div>
                <button type="submit" className="submit-but">Gởi</button>
            </form>
        </div>
    );
}

export default Feedback;
