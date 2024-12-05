import PayCard from "../models/payCardSchema.js";
import User from "../models/userSchema.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";


export const addCardController = async (req, res, next) => {
  const { cardNumber, expiration, cvc, nameOnCard } = req.body;
  const userId = req.user._id;


    // Validate card number
    if (!/^[0-9]{16}$/.test(cardNumber)) {
      return next(CustomErrorHandler.badRequest("Card number must be exactly 16 digits and numeric."));
    }
  
    // Validate expiration date
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiration)) {
      return next(CustomErrorHandler.badRequest("Expiration date must be in the format MM/YY."));
    }
  
    // Validate CVC
    if (!/^[0-9]{3,4}$/.test(cvc)) {
      return next(CustomErrorHandler.badRequest("CVC must be a numeric value of 3 or 4 digits."));
    }
  
    // Validate name on card
    if (typeof nameOnCard !== "string" || nameOnCard.trim().length < 3) {
      return next(CustomErrorHandler.badRequest("Name on card must be at least 3 characters long."));
    }
  

  try {
    const newCard = new PayCard({ cardNumber, expiration, cvc, nameOnCard, user: userId });
    await newCard.save();

    await User.findByIdAndUpdate(userId, { $push: { payment_cards: newCard._id } });

    res.status(201).json({ message: "Card added successfully", card: newCard });
  } catch (error) {
   return next(error);
  }
};


export const editCardController = async (req, res, next) => {
    const { cardId } = req.params;
    const { cardNumber, expiration, cvc, nameOnCard } = req.body;
  
    try {
      const updatedCard = await PayCard.findByIdAndUpdate(
        cardId,
        { cardNumber, expiration, cvc, nameOnCard },
        { new: true }
      );
  
      if (!updatedCard) {
        return res.status(404).json({ message: "Card not found" });
      }
  
      res.status(200).json({ message: "Card updated successfully", card: updatedCard });
    } catch (error) {
     return next(error);
    }
};
  

export const deleteCardController = async (req, res, next) => {
    const { cardId } = req.params;
    const userId = req.user._id;
  
    try {
      const card = await PayCard.findById(cardId);
  
      if (!card || card.user.toString() !== userId.toString()) {
        return res.status(403).json({ message: "Unauthorized or Card not found" });
      }
  
      await User.findByIdAndUpdate(userId, { $pull: { payment_cards: cardId } });
  
      await PayCard.findByIdAndDelete(cardId);
  
      res.status(200).json({ message: "Card deleted successfully" });
    } catch (error) {
     return next(error);
    }
};
  

export const getAllUserCards = async (req, res, next) => {
    try {
      const userId = req.user._id;
  
      const userCards = await PayCard.find({ user: userId });
  
      if (!userCards || userCards.length === 0) {
        return res.status(404).json({ message: "No cards found for this user." });
      }
  
      res.status(200).json({
        success: true,
        cards: userCards,
      });
    } catch (error) {
      return next(error)
    }
};