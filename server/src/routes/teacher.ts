import { Router } from "express";

const router = Router();

// Test route
router.get("/", (req, res) => {
  res.json({ message: "Teacher route works!" });
});

export default router;
