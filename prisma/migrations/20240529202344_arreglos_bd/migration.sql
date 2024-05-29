/*
  Warnings:

  - You are about to alter the column `titulo` on the `pelicula` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(80)`.

*/
-- AlterTable
ALTER TABLE `comentario` MODIFY `texto` VARCHAR(750) NOT NULL;

-- AlterTable
ALTER TABLE `pelicula` MODIFY `titulo` VARCHAR(80) NOT NULL,
    MODIFY `trama` VARCHAR(1000) NOT NULL;
