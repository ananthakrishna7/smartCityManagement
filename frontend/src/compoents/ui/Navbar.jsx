import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem("token"); // Remove token
    localStorage.removeItem("role"); // Remove role

    // Redirect to login page
    navigate("/login");
  };

  // Add scroll event listener to toggle scrolled state
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`top-nav ${
        scrolled || location.pathname !== "/" ? "scrolled" : ""
      }`}
    >
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/transportation">Transportation</Link>
        </li>
        <li>
          <Link to="/forum">Community Forum</Link>
        </li>
        <li>
          <Link to="/city-services">City Services</Link>
        </li>
        <li>
          <Link to="/resource-management">Resource Management</Link>
        </li>
        <li>
          <Link to="/announcements">Announcements</Link>
        </li>
        <li>
          <Link to="/login" onClick={handleLogout}>
            Log Out
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
