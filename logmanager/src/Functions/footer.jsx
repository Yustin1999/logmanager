import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


/* 
       - Footer to go on each page
       - Its supposed to only display when fully scrolled down or when the page does not need to scroll
       - It is currently a big buggy when going across pages, it sticks until you scroll again.
*/
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
                    <h3>{'\u00A9'} 2025 - Newpark Security Ltd</h3>
                </div >
           )}
        </div >
    );
};