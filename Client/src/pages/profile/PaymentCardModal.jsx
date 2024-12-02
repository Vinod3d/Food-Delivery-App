import { useState } from "react";
import styles from "./paymentCardmodal.module.css";

export function PaymentCardModal({ isOpen, onClose, onSave, card }) {
  const [formData, setFormData] = useState({
    holderName: card?.holderName || "",
    cardNumber: "",
    expiryDate: card?.expiryDate || "",
  });

  const handleSave = () => {
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{card ? "Edit Card" : "Add Card"}</h2>
        <form className={styles.modalForm}>
          <input
            type="text"
            placeholder="Card Holder Name"
            value={formData.holderName}
            onChange={(e) =>
              setFormData({ ...formData, holderName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={(e) =>
              setFormData({ ...formData, cardNumber: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Expiry Date (MM/YY)"
            value={formData.expiryDate}
            onChange={(e) =>
              setFormData({ ...formData, expiryDate: e.target.value })
            }
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button type="button" onClick={handleSave}>
              Save
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
