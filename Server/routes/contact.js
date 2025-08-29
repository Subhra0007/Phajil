//routes/contact.js
import express from "express";
import handler from "../controllers/contactForm.js";

const router = express.Router();

router.post("/contact", (req, res, next) => {
  console.log("📩 Contact route hit"); // debug log
  return handler(req, res, next);
});

export default router;
