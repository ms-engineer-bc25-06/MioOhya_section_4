import express from 'express'
import morgan from 'morgan'
import winston from 'winston'
import userRouter from './router/users'
import expensesRouter from './router/expenses'
import categoriesRouter from './router/categories'
import budgetsRouter from './router/budgets'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Winstonの設定
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(), // コンソール出力
    new winston.transports.File({ filename: 'app.log' }), // ファイル出力
  ],
})

// express
const app = express()
const port = 4000

app.use(cors())
app.use(express.json())

// Morganの設定（Winstonに渡す）
const stream = {
  write: (message: string) => logger.info(message.trim()),
}

// MorganミドルウェアをWinstonと連携
app.use(morgan('combined', { stream }))

//BigIntを文字列に変換するミドルウェア
app.use((req, res, next) => {
  const oldJson = res.json
  res.json = function (data) {
    const replacer = (key: string, value: unknown) =>
      typeof value === 'bigint' ? value.toString() : value
    return oldJson.call(this, JSON.parse(JSON.stringify(data, replacer)))
  }
  next()
})

// http://localhost:4000(GET)にアクセスした際の処理
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// ルーティングの処理　第一引数にアクセスしたらXXXXRouterが適用される
app.use('/users', userRouter)
app.use('/expenses', expensesRouter)
app.use('/categories', categoriesRouter)
app.use('/budgets', budgetsRouter)

// エラーハンドラー（想定外のエラーが発生した場合の処理）
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    // 詳細なエラーログを出力
    logger.error('想定外のエラーが発生しました', {
      error: err.message,
      stack: err.stack,
      errorType: err.constructor.name,
      url: req.url,
      method: req.method,
      userAgent: req.headers['user-agent'],
      timestamp: new Date().toISOString(),
    })

    res
      .status(500)
      .send(
        '500 インターネットのサーバーエラーです。サーバーのログを確認してください。',
      )
  },
)

// 確認用
app.listen(port, () => {
  logger.info(`Server running on http://localhost:${port}`)
})
