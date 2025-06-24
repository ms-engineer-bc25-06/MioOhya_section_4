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

// 予算詳細取得
router.get("/:id", (req, res) => {
  const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  const id = Number(req.params.id);
  const budget = db.budgets.find((b: any) => b.id === id);
  if (budget) {
    res.json(budget);
  } else {
    res.status(404).json({ error: "Not found" });
  }
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

// 予算更新
router.patch("/:id", (req, res) => {
  const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  const id = Number(req.params.id);
  const index = db.budgets.findIndex((b: any) => b.id === id);
  if (index !== -1) {
    db.budgets[index] = { ...db.budgets[index], ...req.body };
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json(db.budgets[index]);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

// 予算削除
router.delete("/:id", (req, res) => {
  const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  const id = Number(req.params.id);
  const index = db.budgets.findIndex((b: any) => b.id === id);
  if (index !== -1) {
    db.budgets.splice(index, 1);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

export default router;