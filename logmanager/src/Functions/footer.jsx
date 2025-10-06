import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Footer() {
    const [showFooter, setShowFooter] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setShowFooter(false); // reset footer on route change

        // Run this after a tick so the page has rendered
        const timeout = setTimeout(() => {
            const checkFooterVisibility = () => {
                const scrollTop = window.scrollY;
                const windowHeight = window.innerHeight;
                const fullHeight = document.documentElement.scrollHeight;

                // Short pages
                if (fullHeight <= windowHeight) {
                    setShowFooter(true);
                    return;
                }

                // Long pages: show only at bottom
                if (scrollTop + windowHeight >= fullHeight - 5) {
                    setShowFooter(true);
                } else {
                    setShowFooter(false);
                }
            };

            // Initial check
            checkFooterVisibility();

            // Listen for scroll
            window.addEventListener("scroll", checkFooterVisibility);

            // Cleanup
            return () => window.removeEventListener("scroll", checkFooterVisibility);
        }, 0); // 0ms timeout ensures DOM has rendered

        return () => clearTimeout(timeout);
    }, [location.pathname]);

    if (!showFooter) return null;

    return (
        <div className="footer">
            <h3>© 2025 - Newpark Security Ltd</h3>
        </div>
    );
}