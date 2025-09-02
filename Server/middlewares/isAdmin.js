// middlewares/isAdmin.js
export const isAdmin = async (req, res, next) => {
  try {
    // Trust token role if present
    if (req.user?.accountType?.toLowerCase() === "admin") {
      return next();
    }

    // Fallback: check DB
    const user = await User.findById(req.user.id).select("accountType");
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    if (user.accountType.toLowerCase() !== "admin") {
      return res.status(403).json({ success: false, message: "Admin access only" });
    }

    next();
  } catch (e) {
    return res.status(500).json({ success: false, message: "Admin check failed", error: e.message });
  }
};
