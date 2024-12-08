"use client";

import { useState } from "react";
import { FaArrowLeft, FaWallet, FaCreditCard, FaPlus } from "react-icons/fa";
import styles from "./paymentpage.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/nav/Navbar";
import Footer from "../../components/footer/Footer";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("wallet");
  const location = useLocation();
  const { cart, finalAmount } = location.state || { cart: {}, finalAmount: 0 };

  const paymentMethods = [
    {
      id: "wallet",
      name: "Wallet",
      balance: "Available balance: $300",
      icon: <FaWallet className="w-4 h-4" />,
    },
    {
      id: "maestrokard",
      name: "MaestroKard",
      icon: <FaCreditCard className="w-4 h-4" />,
    },
    {
      id: "paypal",
      name: "Paypal",
      icon: <FaCreditCard className="w-4 h-4" />,
    },
    {
      id: "stripe",
      name: "Stripe",
      icon: <FaCreditCard className="w-4 h-4" />,
    },
  ];

  const handlePayment = () => {
    navigate("/success", { state: cart });
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <header className={styles.header}>
          <button className={styles.backButton}>
            <FaArrowLeft className="w-6 h-6" />
          </button>
          <h1 className={styles.title}>Choose and Pay</h1>
        </header>

        <div className={styles.paymentGroup}>
          <div className={styles.paymentMethods}>
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`${styles.paymentOption} ${
                  selectedMethod === method.id ? styles.selected : ""
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className={styles.optionLeft}>
                  <div className={styles.optionIcon}>{method.icon}</div>
                  <div className={styles.optionDetails}>
                    <span className={styles.optionName}>{method.name}</span>
                    {method.balance && (
                      <span className={styles.optionBalance}>
                        {method.balance}
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                  {selectedMethod === method.id && (
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                  )}
                </div>
              </div>
            ))}

            <button className={styles.paymentOption}>
              <div className={styles.optionLeft}>
                <div className={styles.optionIcon}>
                  <FaPlus className="w-4 h-4" />
                </div>
                <span className={styles.optionName}>Add Debit Card</span>
              </div>
            </button>
          </div>

          <div className={styles.amountSection}>
            <div className={styles.amountContainer}>
              <div className={styles.amountField}>
                <label className={styles.amountLabel}>Amount to be payed</label>
                <h2>₹{finalAmount}</h2>
              </div>
              <button className={styles.proceedButton} onClick={handlePayment}>
                Proceed Payment
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
