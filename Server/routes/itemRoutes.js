import express from "express";
import { createItem, getItemsByCategory, getItemsByRestaurant, getAllItems } from "../controller/itemController.js";

const router = express.Router();

router.post("/add", createItem);
router.get("/category/:categoryId", getItemsByCategory);
router.get("/restaurant/:restaurantId", getItemsByRestaurant);
router.get("/getall", getAllItems);

export default router;