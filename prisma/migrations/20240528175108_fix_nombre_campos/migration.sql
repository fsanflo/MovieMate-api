/*
  Warnings:

  - You are about to drop the column `año` on the `pelicula` table. All the data in the column will be lost.
  - You are about to drop the `actores-peliclas` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `anho` to the `pelicula` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `actores-peliclas` DROP FOREIGN KEY `actores-peliclas_id_actor_fkey`;

-- DropForeignKey
ALTER TABLE `actores-peliclas` DROP FOREIGN KEY `actores-peliclas_id_pelicula_fkey`;

-- AlterTable
ALTER TABLE `pelicula` DROP COLUMN `año`,
    ADD COLUMN `anho` INTEGER NOT NULL;

-- DropTable
DROP TABLE `actores-peliclas`;

-- CreateTable
CREATE TABLE `actores_peliculas` (
    `id_actor` VARCHAR(191) NOT NULL,
    `id_pelicula` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_actor`, `id_pelicula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `actores_peliculas` ADD CONSTRAINT `actores_peliculas_id_actor_fkey` FOREIGN KEY (`id_actor`) REFERENCES `actor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `actores_peliculas` ADD CONSTRAINT `actores_peliculas_id_pelicula_fkey` FOREIGN KEY (`id_pelicula`) REFERENCES `pelicula`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
