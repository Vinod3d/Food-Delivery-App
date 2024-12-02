import styles from "./paymentCard.module.css";

export function PaymentCardComponent() {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardInfo}>
        <p>**** **** **** {card.lastFour}</p>
        <p>{card.holderName}</p>
        <p>Expires: {card.expiryDate}</p>
      </div>
      <div className={styles.cardActions}>
        <button
          className={`${styles.actionButton} ${styles.editButton}`}
          onClick={() => onEdit(card)}
        >
          Edit
        </button>
        <button
          className={`${styles.actionButton} ${styles.removeButton}`}
          onClick={() => onRemove(card)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
