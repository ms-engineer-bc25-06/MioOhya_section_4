import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();
const dbPath = path.join(__dirname, "../../db.json");

// 予算一覧取得
router.get("/", (req, res) => {
  const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  res.json(db.budgets);
});

// 予算新規登録
router.post("/", (req, res) => {
  const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  // 新しいIDを採番（既存の最大ID+1）
  const newId = db.budgets.length > 0 ? Math.max(...db.budgets.map((b: any) => b.id)) + 1 : 1;
  const newBudget = {
    id: newId,
    ...req.body,
  };
  db.budgets.push(newBudget);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.status(201).json(newBudget);
});

export default router;