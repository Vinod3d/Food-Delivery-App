import { useEffect, useState } from "react";

import { PaymentCardModal } from "./PaymentCardModal";
import { FaPlus } from "react-icons/fa6";
import styles from "./paymentCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCardsByUser } from "../../store/slices/payCardSlice";
import { FiEdit3 } from "react-icons/fi";
import { LuCreditCard } from "react-icons/lu";


export default function PaymentCardsPage() {
  const dispatch = useDispatch();
  const { cards } = useSelector((state) => state.payCard);
  console.log(cards);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getCardsByUser());
  }, [dispatch]);

  const openModal = (card = null) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCard(null);
    setIsModalOpen(false);
  };

  const handleSaveCard = (cardData) => {
    // if (selectedCard) {
    //   // Edit existing card
    //   setCards((prevCards) =>
    //     prevCards.map((card) =>
    //       card.id === selectedCard.id ? { ...card, ...cardData } : card
    //     )
    //   );
    // } else {
    //   // Add new card
    //   setCards((prevCards) => [
    //     ...prevCards,
    //     { id: Date.now(), ...cardData, lastFour: cardData.cardNumber.slice(-4) },
    //   ]);
    // }
    // closeModal();
  };

  const handleRemoveCard = (id) => {};

  return (
    <div>
      <h1>Payment Cards</h1>
      <div className={styles.paymentCardGroup}>
        {cards?.map((card) => (
          <div className={styles.cardContainer} key={card.id}>
            <div className={styles.group}>
              <LuCreditCard className={styles.cardIcon}/>
              <div className={styles.cardInfo}>
                <p className={styles.cardNum}>
                  **** **** **** {card.cardNumber.slice(-4)}
                </p>
                <p className={styles.cardHolder}>{card.nameOnCard}</p>
              </div>
            </div>
            <div className={styles.cardActions}>
              <button
                className={`${styles.actionButton} ${styles.editButton}`}
                onClick={() => onEdit(card)}
              >
                <FiEdit3 />
              </button>
            </div>
          </div>
        ))}

        <button 
        onClick={() => openModal()} 
        className={styles.addCardButton}
        style={{width: cards.length <1 ? '33%' : 'auto'}}
        >
          <FaPlus className={styles.addButtonIcon} />
          Add New Card
        </button>
      </div>

      <PaymentCardModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveCard}
        card={selectedCard}
      />
    </div>
  );
}
