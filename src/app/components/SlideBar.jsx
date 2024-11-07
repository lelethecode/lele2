'use client'
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import Feedback from "../feedback/page";

const SlideBar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(null);
  const [user, setUser] = useState(null);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };



  const handleLogin = () => router.push("/login");
  const handleRegister = () => router.push("/form");
  const handleFoodSelection = () => router.push("/FoodSelection");
  const handleSelectedFood = () => router.push("/foodshow");
  const home = () => router.push("/home");
  const Feedback = () => router.push("/feedback");

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // Check for the user and if the page has already reloaded
    if (user && !localStorage.getItem('pageReloaded')) {
      localStorage.setItem('pageReloaded', 'true'); // Set the reload flag
      window.location.reload(); // Reload the page
    }
  }, [user]);

  useEffect(() => {
    // Clean up the reload flag on component mount
    localStorage.removeItem('pageReloaded');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push("/login"); 
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
                  <div className="greeting">Chào Mừng, {user.username}</div> {/* Adjust based on your user data structure */}
                  <button className="buttons" onClick={handleLogout}>Đăng Xuất</button>
                  <button className="buttons" onClick={home}>Trang Chủ</button>
                  <button className="buttons" onClick={handleFoodSelection}>Chọn Món</button>
                  <button className="buttons" onClick={handleSelectedFood}>Món ăn bạn đã chọn</button>
                  <button className="buttons" onClick={Feedback}>Gửi phản hồi</button>
                </div>
              </>
            ) : (
              <>
                <button className="buttons" onClick={home}>Trang Chủ</button>
                <button className="buttons" onClick={handleRegister}>Đăng ký</button>
                <button className="buttons" onClick={handleLogin}>Đăng nhập</button>
                
              </>
            )}
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideBar;
