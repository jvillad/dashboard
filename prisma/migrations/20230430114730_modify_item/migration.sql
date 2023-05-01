/*
  Warnings:

  - You are about to drop the column `createdById` on the `Item` table. All the data in the column will be lost.
  - Added the required column `category` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_createdById_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "createdById",
ADD COLUMN     "category" TEXT NOT NULL;
