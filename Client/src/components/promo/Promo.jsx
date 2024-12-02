/* eslint-disable react/prop-types */
import { cart } from "../../assets/Index.js";
import Styles from "./promo.module.css";
import { TiLocation } from "react-icons/ti";
import { FaCircleArrowDown } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAddresses } from "../../store/slices/addressSlice.js";

const Promo = ({isAuthenticated, user}) => {
  const userId = user._id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {addresses} = useSelector((state)=>state.address);

  const defaultAddress = addresses?.find((address) => address.is_default);

  const addressString = defaultAddress
    ? `${defaultAddress.full_address}, ${defaultAddress.city}, ${defaultAddress.state}, ${defaultAddress.pincode}, India`
    : "No default address set.";
  
  useEffect(()=>{
    dispatch(getAddresses(userId));
  }, [user, userId, dispatch])


  const firstName = user?.name.split(' ')[0];
  return (
    <>
      <header className="container">
  <div className={Styles.header}>
    <div className={Styles.promoBanner}>
      🌟 Get 5% Off your first order, <strong>Promo: ORDERS</strong>
    </div>
    <div className={Styles.locationInfo}>
      <TiLocation className={Styles.icon} />
      {addresses?.length > 0 ? (
        <div className={Styles.addressWrapper}>
          <p 
            className={Styles.address} 
            title={`${addressString}`}
          >
            {addressString.slice(0, 20)}...
          </p>
          <button 
            className={Styles.changeLocation} 
            onClick={() => navigate("/address")}
          >
            Change Location
          </button>
        </div>
      ) : (
        <button 
          className={Styles.changeLocation} 
          onClick={() => navigate("/address")}
        >
          Add Address
        </button>
      )}
    </div>
    <div className={Styles.cart}>
      <button className={Styles.cartButton}>
        <img src={cart} alt="cart" />
        My Cart
      </button>
      <FaCircleArrowDown className={Styles.icon} />
    </div>
  </div>
</header>
      
      <div className={Styles.mobileHeader}>
      {isAuthenticated ? (
            <button className={Styles.login} onClick={() => navigate("/profile")}>
              <IoPersonCircle className={Styles.icon} />
              Hey {firstName}
            </button>
          ) : (
            <button className={Styles.login} onClick={() => navigate("/login")}>
              <IoPersonCircle className={Styles.icon} />
              Login/Signup
            </button>
          )}
        <button className={Styles.cartButton}>
          <img src={cart} alt="" />
          My Cart
        </button>
        <div className={Styles.locationInfo}>
          <TiLocation className={Styles.icon} />
          <p 
            className={Styles.address} 
            title={`${addressString}`}
          >
            {addressString.slice(0, 20)}...
          </p>
        </div>
      </div>
    </>
  );
};

export default Promo;
