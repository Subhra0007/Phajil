// middlewares/isAdmin.js
import User from "../models/User.js";

export const isAdmin = async (req, res, next) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const user = await User.findById(req.user.id).select("accountType");
    if (!user) return res.status(401).json({ success: false, message: "User not found" });
    if (user.accountType !== "Admin") {
      return res.status(403).json({ success: false, message: "Admin access only" });
    }
    next();
  } catch (e) {
    return res.status(500).json({ success: false, message: "Admin check failed", error: e.message });
  }
};
