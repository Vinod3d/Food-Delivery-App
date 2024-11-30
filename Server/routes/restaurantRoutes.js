import express from "express";
import { addRestaurant, getAllRestaurants } from "../controller/restaurantController.js";

const router = express.Router();

router.post("/addrestaurant", addRestaurant);
router.get("/getall", getAllRestaurants);

export default router;
