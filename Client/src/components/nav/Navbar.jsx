import { logo1 } from "../../assets/Index";
import Style from "./navbar.module.css";
import { NavLink } from "react-router-dom";
import { IoPersonCircle, IoClose } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import Promo from "../promo/Promo";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className={Style.headerGroup}>
      <Promo />
      <div className="container">
        <div className={Style.navbar}>
          <img src={logo1} alt="logo" />
          <nav className={Style.deskTopMenu}>
            <NavLink className={Style.active}>Home</NavLink>
            <NavLink>Browse Menu</NavLink>
            <NavLink>Special Offers</NavLink>
            <NavLink>Restaurants</NavLink>
            <NavLink>Track Order</NavLink>
          </nav>
          <button className={Style.login}>
            <IoPersonCircle className={Style.icon} />
            Login/Signup
          </button>
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
          <button className={Style.login}>
              <IoPersonCircle className={Style.icon} />
              Login/Signup
            </button>
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
