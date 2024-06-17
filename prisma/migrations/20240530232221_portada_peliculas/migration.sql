/*
  Warnings:

  - Added the required column `portada` to the `pelicula` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pelicula` ADD COLUMN `portada` VARCHAR(300) NOT NULL;
