import { Router } from "express";

const router = Router();

// Test route
router.get("/", (req, res) => {
  res.json({ message: "Student route works!" });
});

export default router;
