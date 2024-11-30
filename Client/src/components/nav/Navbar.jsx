/* eslint-disable react/prop-types */
import { logo1 } from "../../assets/Index";
import Style from "./navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPersonCircle, IoClose } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import Promo from "../promo/Promo";
import { useState } from "react";

const Navbar = ({ active, isAuthenticated, user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const firstName = user?.name.split(' ')[0];

  return (
    <div className={Style.headerGroup}>
      <Promo 
        isAuthenticated={isAuthenticated}
        user={user}
      />
      <div className="container">
        <div className={Style.navbar}>
          <img src={logo1} alt="logo" />
          <nav className={Style.deskTopMenu}>
            <NavLink className={active == "home" ? Style.active : ""}>
              Home
            </NavLink>
            <NavLink>Browse Menu</NavLink>
            <NavLink>Special Offers</NavLink>
            <NavLink className={active == "restaurant" ? Style.active : ""}>
              Restaurants
            </NavLink>
            <NavLink>Track Order</NavLink>
          </nav>
          {isAuthenticated ? (
            <button className={Style.login} onClick={() => navigate("/profile")}>
              <IoPersonCircle className={Style.icon} />
              Hey {firstName}
            </button>
          ) : (
            <button className={Style.login} onClick={() => navigate("/login")}>
              <IoPersonCircle className={Style.icon} />
              Login/Signup
            </button>
          )}
          <IoIosMenu className={Style.menuIcon} onClick={toggleMenu} />
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`${Style.overlay} ${menuOpen ? Style.open : ""}`}
        onClick={closeMenu}
      ></div>

      {/* Mobile Menu */}
      <div className={`${Style.mobileMenu} ${menuOpen ? Style.open : ""}`}>
        <div className={Style.mobileMenuGroup}>
          {isAuthenticated ? (
            <button className={Style.login} onClick={() => navigate("/profile")}>
              <IoPersonCircle className={Style.icon} />
              Hey {firstName}
            </button>
          ) : (
            <button className={Style.login} onClick={() => navigate("/login")}>
              <IoPersonCircle className={Style.icon} />
              Login/Signup
            </button>
          )}
          <button className={Style.closeMenu} onClick={closeMenu}>
            <IoClose />
          </button>
        </div>
        <nav>
          <NavLink onClick={closeMenu}>Home</NavLink>
          <NavLink onClick={closeMenu}>Browse Menu</NavLink>
          <NavLink onClick={closeMenu}>Special Offers</NavLink>
          <NavLink onClick={closeMenu}>Restaurants</NavLink>
          <NavLink onClick={closeMenu}>Track Order</NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
