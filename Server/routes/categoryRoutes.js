import express from "express";
import { createCategory, getCategoriesByRestaurant, getAllCategories, getUniqueCategories } from "../controller/categoryController.js";

const router = express.Router();

router.post("/add", createCategory);
router.get("/getuniqe", getUniqueCategories); 
router.get("/", getAllCategories);
router.get("/:restaurantId", getCategoriesByRestaurant);


export default router;
