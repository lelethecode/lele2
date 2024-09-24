'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const SlideBar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Toggle the menu open/closed
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Navigate to different pages
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

  return (
    <div>
      <div className="containerbox">
        <img src="/images/logo.png" className="faslogo" id="ex-mar" alt="Logo" />
        <h2 className="logotitle">FAS</h2>
        <span className="divider" id="ex-mar"></span>
        
        <div className="navbar">
          <button
            className="hamburger"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="button-bar"
          >
            ☰
          </button>
          <div className={`button-greeting">Welcome, {user.name}</div> {/* Adjust based on your user data structure */}
                  <button className="buttons" onClick={handleLogout}>Logout</button>
                </div>
              </>
            ) : (
              <>
                <button className="buttons" onClick={handleLogin}>Đăng nhập</button>
                <button className="buttons" onClick={handleRegister}>Đăng ký</button>
              </>
            )}
            <button className="buttons" onClick={handleFoodSelection}>Chọn Món</button>
            <button className="buttons" onClick={handleSelectedFood}>Món ăn bạn đã chọn</button>
            <button className="buttons" onClick={home}>Trang Chủ</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideBar;
