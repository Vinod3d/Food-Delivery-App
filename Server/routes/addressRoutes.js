import express from "express";
import { addAddress, deleteAddress, getAllAddresses, updateAddress } from "../controller/addressController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add", auth, addAddress);
router.get("/user/:userId/addresses", auth, getAllAddresses);
router.put("/update/:id", auth, updateAddress);
router.delete("/delete/:id", auth, deleteAddress);

export default router;
