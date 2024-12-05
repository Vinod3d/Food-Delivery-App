import express from "express";
import { addRestaurant, getAllRestaurants, getRestaurantById } from "../controller/restaurantController.js";

const router = express.Router();

router.post("/addrestaurant", addRestaurant);
router.get("/getall", getAllRestaurants);
router.get("/:id", getRestaurantById);

export default router;
