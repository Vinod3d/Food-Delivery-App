import { useEffect, useState } from "react";

import { PaymentCardModal } from "./PaymentCardModal";
import { FaPlus } from "react-icons/fa6";
import styles from "./paymentCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addCard, clearErrors, deleteCard, editCard, getCardsByUser } from "../../store/slices/payCardSlice";
import { FiEdit3 } from "react-icons/fi";
import { LuCreditCard } from "react-icons/lu";
import { toast } from 'react-toastify';


export default function PaymentCardsPage() {
  const dispatch = useDispatch();
  const { cards, error } = useSelector((state) => state.payCard);
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

  const handleSaveCard = async (cardData) => {
    if (selectedCard) {
      const result = await dispatch(editCard(selectedCard._id, cardData));
      if (result) {
        toast.success("Card updated successfully!");
        dispatch(getCardsByUser());
      }
    } else {
      const result = await dispatch(addCard(cardData));
      if (result) {
        toast.success("Card added successfully!");
        dispatch(getCardsByUser());
      }
    }
    closeModal();
  };

  const handleRemoveCard = async (cardId) => {
    const confirmed = window.confirm("Are you sure you want to delete this card?");
    if (!confirmed) return;

    const result = await dispatch(deleteCard(cardId));
    if (result) {
      toast.success("Card removed successfully.");
      dispatch(getCardsByUser()); // Refresh the card list
    } else {
      toast.error("Failed to remove card.");
    }
  };

  useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch(clearErrors())
    }
  })

  return (
    <div>
      <p className={styles.title}>Payment Cards</p>
      <div className={styles.paymentCardGroup}>
        {cards?.map((card) => (
          <div className={styles.cardContainer} key={card.id}>
            <div className={styles.group}>
              <LuCreditCard className={styles.cardIcon}/>
              <div className={styles.cardInfo}>
                <p className={styles.cardNum}>
                  XXXX XXXX XXXX {card.cardNumber.slice(-4)}
                </p>
                <p className={styles.cardHolder}>{card.nameOnCard}</p>
              </div>
            </div>
            <div className={styles.cardActions}>
              <button
                className={`${styles.actionButton} ${styles.editButton}`}
                onClick={() => openModal(card)}
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
        onRemove={handleRemoveCard}
        card={selectedCard}
      />
    </div>
  );
}
