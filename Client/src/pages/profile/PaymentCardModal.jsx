/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import styles from "./paymentCardmodal.module.css";

export function PaymentCardModal({ isOpen, onClose, onSave, onRemove , card }) {

  const [formData, setFormData] = useState({
    cardNumber: "",
    expiration: "",
    nameOnCard: "",
    cvc: "",
  });

  useEffect(() => {
    setFormData({
      nameOnCard: card?.nameOnCard || "",
      cardNumber: card?.cardNumber || "",
      expiration: card?.expiration || "",
      cvc: card?.cvc || "",
    });
  }, [card]);

  const resetFormData = () => {
    setFormData({
      cardNumber: "",
      expiration: "",
      nameOnCard: "",
      cvc: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!formData.cardNumber || !formData.expiration || !formData.cvc || !formData.nameOnCard) {
      alert("Please fill in all the fields");
      return;
    }

    onSave(formData);
    resetFormData();
    onClose();
  };

  const handleClose = () => {
    resetFormData(); // Clear form data when closing modal
    onClose();
  };

  const handleRemove = (cardId) =>{
    onRemove(cardId);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h2 className={styles.title}> {card ? 'Edit' : 'Add'} Payment Method</h2>
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
                value={formData.cardNumber}
                onChange={handleChange}
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
                value={formData.expiration}
                onChange={handleChange}
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
                value={formData.cvc}
                onChange={handleChange}
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
                value={formData.nameOnCard}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
        <div className={styles.footer}>
          {card && <button className={styles.removeButton} onClick={()=>handleRemove(card._id)}>Remove</button>}
          <div className={styles.buttonGroup}>
            <button className={styles.cancelButton} onClick={() => onClose()}>
              Cancel
            </button>
            <IoIosCloseCircleOutline
              className={styles.closeIcon}
              onClick={handleClose}
            />
            <button className={styles.saveButton} onClick={handleSave}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
