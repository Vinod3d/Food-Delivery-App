
import express from "express";
import { getCart, removeFromCart } from "../controller/cartController.js";
import { addToCart } from "../controller/cartController.js";
import auth from "../middleware/auth.js";


const router = express.Router();

router.get("/cart", auth, getCart);
router.post("/cart", auth, addToCart);
router.delete("/cart/item/:itemId", auth, removeFromCart);

export default router;
