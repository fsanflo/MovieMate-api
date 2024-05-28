/*
  Warnings:

  - You are about to drop the column `anho` on the `pelicula` table. All the data in the column will be lost.
  - Added the required column `año` to the `pelicula` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duracion` to the `pelicula` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pelicula` DROP COLUMN `anho`,
    ADD COLUMN `año` INTEGER NOT NULL,
    ADD COLUMN `duracion` INTEGER NOT NULL;
