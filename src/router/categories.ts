import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send("カテゴリです");
});

export default router;