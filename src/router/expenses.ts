import { Router } from "express";
import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import  logger  from '../logger';

const router = Router();
const prisma = new PrismaClient();

//全明細参照
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const expenses = await prisma.expense.findMany();
    if (expenses) {
      logger.info('明細一覧の取得に成功しました。', { 件数: expenses.length });
      res.json(expenses); 
    } else {
      logger.warn('明細が存在しません。');
      res.status(404).json({ error: "明細が存在しません。" });
    }
  } catch (error) {
    // デバッグ用：エラーの構造を確認
    console.log('Error object:', error);
    console.log('Error type:', typeof error);
    console.log('Error constructor:', error instanceof Error ? error.constructor.name : 'Unknown');
    
    // 想定外のエラーはapp.tsのエラーハンドラーで統一処理
    next(error);
  }
});

//特定の明細参照
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const expense = await prisma.expense.findUnique({
      where: { id: Number(id) },
    });
    if (expense) {
      logger.info('明細の取得に成功しました。', { 明細ID: id });
      res.json(expense); 
    } else {
      logger.warn('指定した明細は存在しません。', { 明細ID: id });
      res.status(404).json({ error: "指定した明細は存在しません。" });
    }
  } catch (error) {
    // 想定外のエラーはapp.tsのエラーハンドラーで統一処理
    next(error);
  }
});

// 明細新規登録
router.post("/", async (req, res, next) => {
  try {
    // デバッグ用：送信されたデータを確認
    console.log('Received data:', req.body);
    console.log('Data types:', {
      amount: typeof req.body.amount,
      date: typeof req.body.date,
      type: typeof req.body.type,
      category: typeof req.body.category
    });
    
    logger.debug('明細の新規登録を開始します。', { 
      amount: req.body.amount,
      description: req.body.description 
    });  // 処理開始のデバッグログ

    // データの型変換
    const expenseData = {
      date: new Date(req.body.date),    // 文字列をDateに変換
      type: req.body.type,
      category: req.body.category,
      amount: BigInt(req.body.amount), // 文字列をBigIntに変換
      memo: req.body.memo
    };

    console.log('Transformed data:', expenseData);

    // 既存のデータを確認
    const existingExpenses = await prisma.expense.findMany({
      orderBy: { id: 'desc' },
      take: 5
    });
    console.log('Existing expenses (latest 5):', existingExpenses);

    const expense = await prisma.expense.create({
      data: expenseData
    }); //  データベース操作（新規登録）

    logger.info('明細の新規登録に成功しました。', { 
      明細ID: expense.id
    });  // 処理成功のデバッグログ

    res.status(201).json(expense); 
  } catch (error) {
    // 想定外のエラーはapp.tsのエラーハンドラーで統一処理
    next(error);
  }
});

//特定の明細更新
router.patch("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    
    // データの型変換
    const updateData = { ...req.body };
    if (req.body.amount) {
      updateData.amount = BigInt(req.body.amount);
    }
    if (req.body.date) {
      updateData.date = new Date(req.body.date);
    }
    
    const updatedExpense = await prisma.expense.update({
      where: { id: Number(id) },
      data: updateData,
    });
    logger.info('明細の更新に成功しました。', { 明細ID: id });
    res.json(updatedExpense); 
  } catch (error) {
    // 想定外のエラーはapp.tsのエラーハンドラーで統一処理
    next(error);
  }
});

//特定の明細削除
router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await prisma.expense.delete({
      where: { id: Number(id) },
    });
    logger.info('明細の削除に成功しました。', { 明細ID: id });
    res.json({ message: "明細の削除に成功しました。" });
  } catch (error) {
    // 想定外のエラーはapp.tsのエラーハンドラーで統一処理
    next(error);
  }
});


export default router;