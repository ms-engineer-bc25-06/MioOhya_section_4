import express from 'express';
import userRouter from './router/user';
import expensesRouter from './router/expenses';
import categoriesRouter from './router/categories';
import budgetsRouter from './router/budgets';
import cors from 'cors';

// express
const app = express();
const port = 4000;

// http://localhost:4000(GET)にアクセスした際の処理
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//CORSミドルウェア
app.use(cors());

//JSONミドルウェア
app.use(express.json());

// ルーティングの処理　第一引数にアクセスしたらuserRouterが適用される
app.use('/user', userRouter);
app.use('/expenses', expensesRouter);
app.use('/categories', categoriesRouter);
app.use('/budgets', budgetsRouter);

// 確認用
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});