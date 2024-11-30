import express from "express";
import { addRestaurant } from "../controller/restaurantController.js";

const router = express.Router();

router.post("/addrestaurant", addRestaurant);

export default router;
