/*
  Warnings:

  - You are about to drop the column `genero` on the `pelicula` table. All the data in the column will be lost.
  - You are about to alter the column `tipo` on the `rol` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `pelicula` DROP COLUMN `genero`;

-- AlterTable
ALTER TABLE `rol` MODIFY `tipo` ENUM('Admin', 'Usuario') NOT NULL DEFAULT 'Usuario';

-- CreateTable
CREATE TABLE `genero` (
    `id` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `generos_peliculas` (
    `id_genero` INTEGER NOT NULL,
    `id_pelicula` INTEGER NOT NULL,

    PRIMARY KEY (`id_genero`, `id_pelicula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `generos_peliculas` ADD CONSTRAINT `generos_peliculas_id_genero_fkey` FOREIGN KEY (`id_genero`) REFERENCES `genero`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `generos_peliculas` ADD CONSTRAINT `generos_peliculas_id_pelicula_fkey` FOREIGN KEY (`id_pelicula`) REFERENCES `pelicula`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
