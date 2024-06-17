/*
  Warnings:

  - You are about to drop the column `fecha_fallecimiento` on the `actor` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_nacimiento` on the `actor` table. All the data in the column will be lost.
  - Added the required column `personaje` to the `actores_peliculas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `actor` DROP COLUMN `fecha_fallecimiento`,
    DROP COLUMN `fecha_nacimiento`,
    ADD COLUMN `imagen` VARCHAR(300) NULL;

-- AlterTable
ALTER TABLE `actores_peliculas` ADD COLUMN `personaje` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `pelicula` MODIFY `portada` VARCHAR(300) NULL;
