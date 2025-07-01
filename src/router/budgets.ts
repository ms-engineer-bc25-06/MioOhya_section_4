import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()

const prisma = new PrismaClient()

// 予算一覧取得
router.get('/', async (req, res, next) => {
  try {
    const budgets = await prisma.budgets.findMany()
    res.json(budgets)
  } catch (err) {
    next(err) // エラーハンドラに渡す
  }
})

// 予算詳細取得
router.get('/:id', async (req, res) => {
  const id = req.params.id
  const budget = await prisma.budgets.findUnique({
    where: { id: Number(id) },
  })
  if (budget) {
    res.json(budget)
  } else {
    res.status(404).json({ error: 'Not found' })
  }
})

// 予算新規登録
router.post('/', async (req, res) => {
  const newBudget = await prisma.budgets.create({
    data: req.body,
  })
  res.status(201).json(newBudget)
})

// 予算更新
router.patch('/:id', async (req, res) => {
  const id = req.params.id
  const budget = await prisma.budgets.update({
    where: { id: Number(id) },
    data: req.body,
  })
  res.json(budget)
})

// 予算削除
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const budget = await prisma.budgets.delete({
    where: { id: Number(id) },
  })
  res.json({ message: 'Deleted' })
})

export default router
