import express from 'express';
import userRouter from './router/user';
import expensesRouter from './router/expenses';
import categoriesRouter from './router/categories';
import budgetsRouter from './router/budgets';
import cors from 'cors';

// express
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const oldJson = res.json;
  res.json = function (data) {
    const replacer = (key: string, value: any) =>
      typeof value === 'bigint' ? value.toString() : value;
    return oldJson.call(this, JSON.parse(JSON.stringify(data, replacer)));
  };
  next();
});

// http://localhost:4000(GET)にアクセスした際の処理
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// ルーティングの処理　第一引数にアクセスしたらXXXXRouterが適用される
app.use('/user', userRouter);
app.use('/expenses', expensesRouter);
app.use('/categories', categoriesRouter);
app.use('/budgets', budgetsRouter);

// 確認用
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});