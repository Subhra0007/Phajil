//routes/address.js
import express from "express";
import { auth } from "../middlewares/auth.js";
import { addAddress, updateAddress, deleteAddress, getAddresses } from "../controllers/address.js";

const router = express.Router();

router.post("/add", auth, addAddress);
router.put("/update", auth, updateAddress);
router.delete("/delete", auth, deleteAddress);
router.get("/all", auth, getAddresses);

export default router;