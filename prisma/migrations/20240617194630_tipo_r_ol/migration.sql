/*
  Warnings:

  - You are about to alter the column `tipo` on the `rol` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `rol` MODIFY `tipo` VARCHAR(191) NOT NULL;
