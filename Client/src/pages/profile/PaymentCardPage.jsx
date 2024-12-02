import { useState } from "react";
import { PaymentCardComponent } from "./PaymentCardComponent";
import { PaymentCardModal } from "./PaymentCardModal";

export default function PaymentCardsPage() {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (card = null) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCard(null);
    setIsModalOpen(false);
  };

  const handleSaveCard = (cardData) => {
    if (selectedCard) {
      // Edit existing card
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === selectedCard.id ? { ...card, ...cardData } : card
        )
      );
    } else {
      // Add new card
      setCards((prevCards) => [
        ...prevCards,
        { id: Date.now(), ...cardData, lastFour: cardData.cardNumber.slice(-4) },
      ]);
    }
    closeModal();
  };

  const handleRemoveCard = (id) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  return (
    <div>
      <h1>Payment Cards</h1>
      <button onClick={() => openModal()}>Add New Card</button>

      <div>
        {cards.map((card) => (
          <PaymentCardComponent
            key={card.id}
            card={card}
            onEdit={() => openModal(card)}
            onRemove={handleRemoveCard}
          />
        ))}
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
