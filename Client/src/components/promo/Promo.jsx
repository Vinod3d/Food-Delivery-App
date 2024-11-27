import { cart } from "../../assets/Index.js";
import Styles from "./promo.module.css";
import { TiLocation } from "react-icons/ti";
import { FaCircleArrowDown } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Promo = () => {
  const navigate = useNavigate();
  return (
    <>
      <header className="container">
        <div className={Styles.header}>
          <div className={Styles.promoBanner}>
            🌟 Get 5% Off your first order, <strong>Promo: ORDERS</strong>
          </div>
          <div className={Styles.locationInfo}>
            <TiLocation className={Styles.icon} />
            <p className={Styles.address}>Regent Street, A4, A4201, London</p>
            <button className={Styles.changeLocation}>Change Location</button>
          </div>
          <div className={Styles.cart}>
            <button className={Styles.cartButton}>
              <img src={cart} alt="" />
              My Cart
            </button>
            <FaCircleArrowDown className={Styles.icon} />
          </div>
        </div>
      </header>
      
      <div className={Styles.mobileHeader}>
        <button className={Styles.login} onClick={()=>navigate('/login')}>
          <IoPersonCircle className={Styles.icon} />
          Login/Signup
        </button>
        <button className={Styles.cartButton}>
          <img src={cart} alt="" />
          My Cart
        </button>
        <div className={Styles.locationInfo}>
          <TiLocation className={Styles.icon} />
          <p className={Styles.address}>Regent Street, A4, A4201, London</p>
        </div>
      </div>
    </>
  );
};

export default Promo;
