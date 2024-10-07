'use client'
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import Feedback from "../feedback/page";

const SlideBar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(null);
  const [user, setUser] = useState(null);
  // const barRef = useRef(true);

  // Toggle the menu open/closed
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

//   useEffect(() => {
//     function handler(event) {
//         if(!barRef.current?.contains(event.target)) {
//           setMenuOpen(false);
//         }
//     }
//     window.addEventListener('click', handler);
//     return () => window.removeEventListener('click', handler);
// }, [barRef]);

  const handleLogin = () => router.push("/login");
  const handleRegister = () => router.push("/form");
  const handleFoodSelection = () => router.push("/FoodSelection");
  const handleSelectedFood = () => router.push("/foodshow");
  const home = () => router.push("/home");

  // Load user information from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push("/login"); // Redirect to login after logout
  };

  console.log(user)

  return (
    <div>
      <div className="containerbox">
        <div className="left-section">
          <img src="/images/logo.jpg" className="faslogo" id="ex-mar" alt="Logo" />
          <h2 className="logotitle">Food Arrangement Service</h2>
          {/* <span className="divider" id="ex-mar"></span> */}
        </div>
        
        
        <div className="navbar">
          <button
            className="hamburger"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="bar-button"
          >
            ☰
          </button>
          <div className={`button-bar ${menuOpen ? 'open' : ''}`} id="bar-button" 
          // ref={barRef}
          >
            {user ? (
              <>
                <div className="user-info">
                  <div className="greeting">Welcome, {user.username}</div> {/* Adjust based on your user data structure */}
                  <button className="buttons" onClick={handleLogout}>Logout</button>
                </div>
              </>
            ) : (
              <>
                <button className="buttons" onClick={handleLogin}>Đăng nhập</button>
                <button className="buttons" onClick={handleRegister}>Đăng ký</button>
              </>
            )}
            <button className="buttons" onClick={home}>Trang Chủ</button>
            <button className="buttons" onClick={handleFoodSelection}>Chọn Món</button>
            <button className="buttons" onClick={handleSelectedFood}>Món ăn bạn đã chọn</button>
            <button className="buttons" onClick={Feedback}>Gửi phản hồi</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideBar;
