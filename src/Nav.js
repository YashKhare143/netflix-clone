import React, { useEffect, useState } from 'react'
import "./Nav.css"

function Nav() {
    const [show, handleShow] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll", null);
        };
    }, [])

    return (
        <nav className={`nav ${show && "nav_black"}`}>
            <div className="nav_logo">
                <a href="/">MovieLoverss</a>
            </div>
        </nav>
    )
}

export default Nav