import express from "express";
import {
  addCardController,
  editCardController,
  deleteCardController,
  getAllUserCards,
} from "../controller/payCardController.js";
import auth from "../middleware/auth.js";

const router = express.Router();


router.post("/card", auth, addCardController);
router.put("/card/:cardId", auth, editCardController);
router.delete("/card/:cardId", auth, deleteCardController);
router.get("/cards", auth, getAllUserCards);

export default router;