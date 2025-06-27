// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Expenseデータ
  await prisma.expense.createMany({
    data: [
      { id: 1, date: new Date("2025-06-01"), type: "支出", category: "娯楽費", amount: 1000, memo: "ランチ" },
      { id: 2, date: new Date("2025-06-05"), type: "収入", category: "給料", amount: 300000, memo: "5月分" },
      { id: 3, date: new Date("2025-06-28"), type: "支出", category: "食費", amount: 220, memo: "アイスクリーム" },
      { id: 4, date: new Date("2025-06-19"), type: "支出", category: "医療費", amount: 1500, memo: "耳鼻科" },
      { id: 5, date: new Date("2025-06-20"), type: "支出", category: "住居費", amount: 30000, memo: "管理費" },
      { id: 6, date: new Date("2025-06-27"), type: "支出", category: "食費", amount: 450, memo: "プリン" },
      { id: 7, date: new Date("2025-06-21"), type: "支出", category: "美容費", amount: 10000, memo: "" },
      { id: 8, date: new Date("2025-06-21"), type: "支出", category: "食費", amount: 1000, memo: "ランチ" },
      { id: 9, date: new Date("2025-05-30"), type: "支出", category: "教育費", amount: 5000, memo: "" },
      { date: new Date("2025-06-24"), type: "支出", category: "お小遣い", amount: 1000, memo: "夏目のお小遣い", id: 10 },
      { date: new Date("2025-06-24"), type: "支出", category: "お小遣い", amount: 500, memo: "パパのお小遣い", id: 11 },
      { date: new Date("2025-06-25"), type: "支出", category: "医療費", amount: 6000, memo: "", id: 12 },
      { date: new Date("2025-06-27"), type: "支出", category: "食費", amount: 1500, memo: "スーパーで買い物", id: 13 }
    ]
  });

  // Budgetsデータ
  await prisma.budgets.createMany({
    data: [
      { id: 1, Year: 2025, month: 6, category: "食費", amount: 50000 },
      { id: 2, Year: 2025, month: 6, category: "食費", amount: 70000 }
    ]
  });
}

main()
  .catch(e => { throw e; })
  .finally(async () => { await prisma.$disconnect(); });
