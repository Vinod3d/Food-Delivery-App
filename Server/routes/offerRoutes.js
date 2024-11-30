import express from "express";
import {
  createOffer,
  getAllOffers,
  getOffersByRestaurantId
} from "../controller/offerController.js";

const router = express.Router();

router.post("/create", createOffer);
router.get("/getall", getAllOffers);
router.get("/restaurant/:restaurantId", getOffersByRestaurantId);

export default router;
