import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();
const dbPath = path.join(__dirname, "../../db.json");

//全明細参照
router.get("/", (req, res) => {
  const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  res.json(db.expenses);
});

//特定の明細参照
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  const expense = db.expenses.find((item: any) => item.id == id);
  if (expense) {
    res.json(expense);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});


// 明細新規登録
router.post("/", (req, res) => {
  const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  const newExpense = {
    ...req.body,
    id: Date.now().toString(), // ← ここでidを自動生成
  };
  db.expenses.push(newExpense);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.status(201).json(newExpense);
});

//特定の明細更新
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  const index = db.expenses.findIndex((item: any) => item.id == id);

  if (index !== -1) {
    // 新しいデータで上書き
    db.expenses[index] = { ...db.expenses[index], ...req.body, id }; // idはそのまま
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json(db.expenses[index]);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

//特定の明細削除
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  // ID を基に削除対象のアイテムを検索
  const index = db.expenses.findIndex((item: any) => item.id == id);
  if (index !== -1) {
    // 削除対象のアイテムを削除
    db.expenses.splice(index, 1);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json({ message: "Deleted" });
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

export default router;