'use client'
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

const SlideBar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogin = () => router.push("/login");
  const handleRegister = () => router.push("/form");
  const handleFoodSelection = () => router.push("/FoodSelection");
  const handleSelectedFood = () => router.push("/FoodSelection");
  const home = () => router.push("/home");

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
          <div className={`button-bar ${menuOpen ? 'open' : ''}`} id="button-bar">
            <button className="buttons" onClick={handleLogin}>Đăng nhập</button>
            <button className="buttons" onClick={handleRegister}>Đăng ký</button>
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
