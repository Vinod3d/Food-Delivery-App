import express from "express";
import { createCategory, getCategoriesByRestaurant, getAllCategories } from "../controller/categoryController.js";

const router = express.Router();

router.post("/add", createCategory);
router.get("/:restaurantId", getCategoriesByRestaurant);
router.get("/", getAllCategories);


export default router;
