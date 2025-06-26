-- CreateTable
CREATE TABLE "Budgets" (
    "id" SERIAL NOT NULL,
    "Year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Budgets_pkey" PRIMARY KEY ("id")
);
