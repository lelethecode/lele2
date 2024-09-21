'use client'
import React, { useState } from "react"
import { useRouter } from 'next/navigation'


const SlideBar = ({contacts}) => {
    const router = useRouter()
    const [gtC, setGTC] = useState(false)

    function e() {
        router.push("/form");
    }
    function chonmon() {
        router.push("/form");
    }
    function monandachon() {
        router.push("/form");
    }
    function home() {
        router.push("/form");
    }
    return <div>
        <div className = "containerbox">
            <img src="/images/logo.png" className = "faslogo" id = "ex-mar"/>
            <h2 className = "logotitle">FAS</h2>
            <span className = "divider" id = "ex-mar"></span>

            <div id = "ex-mar" className = "formbuttons">
                <button className = "buttons" onClick={e}>Đăng nhập</button>
                <button className = "buttons" onClick={e}>Đăng ký</button>
                <button className = "buttons" onClick={e}>Chọn Món</button>
                <button className = "buttons" onClick={e}>Món ăn bạn đã chọn</button>
                <button className = "buttons" onClick={e}>Trang Chủ</button>
            </div>
        </div>
        
    </div>
    
}

export default SlideBar