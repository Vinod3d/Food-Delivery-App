"use client";

import { BsCheckLg } from "react-icons/bs";
import styles from "./success.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/nav/Navbar";
import Footer from "../../components/footer/Footer";

export default function Success() {
  const location = useLocation();
  const cart = location.state;
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.iconContainer}>
          <div className={styles.iconWrapper}>
            <BsCheckLg className={styles.icon} />
          </div>
        </div>

        <h1 className={styles.title}>Order Placed Successfully</h1>
        <p className={styles.subtitle}>
          Your order is confirmed and on its way. Get set to savor your chosen
          delights!
        </p>

        <div className={styles.orderSummary}>
          {cart?.items.map((item) => (
            <div className={styles.orderItem} key={item._id}>
              {item.product.name}
            </div>
          ))}
          <button onClick={handleBackToHome} className={styles.button}>
            Back to Home
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
