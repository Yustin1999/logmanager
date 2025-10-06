import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
export default function Footer() {
    const [showFooter, setShowFooter] = useState(false);
    const location = useLocation();
    useEffect(() => {

        setShowFooter(false);
        const checkFooterVisibility = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const fullHeight = document.documentElement.scrollHeight;

            if (fullHeight <= windowHeight) {
                setShowFooter(true);
                return;
            }

            if (scrollTop + windowHeight >= fullHeight - 5) {
                setShowFooter(true);
            } else {
                setShowFooter(false);
            }
        }; 
        checkFooterVisibility();
        window.addEventListener("scroll", checkFooterVisibility);
        return () => window.removeEventListener("scroll", checkFooterVisibility);
    }, [location.pathname]);

    return (
        <div >
            {showFooter && ( 
                <div className="footer">
                    <h3>© 2025 - Newpark Security Ltd</h3>
                </div >
           )}
        </div >
    );
};