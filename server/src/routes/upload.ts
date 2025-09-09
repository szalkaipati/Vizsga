import { Router } from "express";
const router = Router();

router.post("/", (req, res) => {
  // handle file upload logic
  res.json({ success: true });
});

export default router;
