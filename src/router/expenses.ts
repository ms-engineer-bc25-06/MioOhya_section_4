import { Router } from "express";
import { PrismaClient } from '@prisma/client';

const router = Router();

const prisma = new PrismaClient();

//全明細参照
router.get("/", async (req, res) => {
  const expenses = await prisma.expense.findMany();
  res.json(expenses);
});

//特定の明細参照
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const expense = await prisma.expense.findUnique({
    where: { id: Number(id) },
  });
  if (expense) {
    res.json(expense);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});


// 明細新規登録
router.post("/", async (req, res) => {
  const newExpense = await prisma.expense.create({
    data: req.body,
  });
  res.status(201).json(newExpense);
});

//特定の明細更新
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedExpense = await prisma.expense.update({
    where: { id: Number(id) },
    data: req.body,
  });
  res.json(updatedExpense);
});

//特定の明細削除
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await prisma.expense.delete({
    where: { id: Number(id) },
  });
  res.json({ message: "Deleted" });
});

export default router;