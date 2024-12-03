import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import styles from "./paymentCardmodal.module.css";

export function PaymentCardModal({ isOpen, onClose, onSave, card }) {
  const [formData, setFormData] = useState({
    holderName: card?.holderName || "",
    cardNumber: "",
    expiryDate: card?.expiryDate || "",
  });

  // const handleSave = () => {
  //   onSave(formData);
  // };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Edit Payment Method</h2>
        <form>
          <div className={styles.inputGroup}>
            <label htmlFor="cardNumber" className={styles.label}>
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              className={styles.input}
              placeholder="XXXX XXXX XXXX 1234"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="expiration" className={styles.label}>
              Expiration
            </label>
            <input
              type="text"
              id="expiration"
              name="expiration"
              className={styles.input}
              placeholder="11/26"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="cvc" className={styles.label}>
              CVC
            </label>
            <input
              type="text"
              id="cvc"
              name="cvc"
              className={styles.input}
              placeholder="XXX"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="nameOnCard" className={styles.label}>
              Name on Card
            </label>
            <input
              type="text"
              id="nameOnCard"
              name="nameOnCard"
              className={styles.input}
              placeholder="Mike Ross"
            />
          </div>
        </form>
      </div>
      <div className={styles.footer}>
        <button className={styles.removeButton}>Remove</button>
        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} onClick={()=>onClose()}>Cancel</button>
          <IoIosCloseCircleOutline className={styles.closeIcon} onClick={()=>onClose()}/>
          <button className={styles.saveButton}>Save Changes</button>
        </div>
      </div>
    </div>
    </div>
  );
}
