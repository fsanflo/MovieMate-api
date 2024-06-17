/*
  Warnings:

  - The primary key for the `actor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `actor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `actores_peliculas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id_actor` on the `actores_peliculas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_pelicula` on the `actores_peliculas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_pelicula` on the `comentario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `pelicula` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `pelicula` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `actores_peliculas` DROP FOREIGN KEY `actores_peliculas_id_actor_fkey`;

-- DropForeignKey
ALTER TABLE `actores_peliculas` DROP FOREIGN KEY `actores_peliculas_id_pelicula_fkey`;

-- DropForeignKey
ALTER TABLE `comentario` DROP FOREIGN KEY `comentario_id_pelicula_fkey`;

-- AlterTable
ALTER TABLE `actor` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `actores_peliculas` DROP PRIMARY KEY,
    MODIFY `id_actor` INTEGER NOT NULL,
    MODIFY `id_pelicula` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id_actor`, `id_pelicula`);

-- AlterTable
ALTER TABLE `comentario` MODIFY `id_pelicula` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `pelicula` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `comentario` ADD CONSTRAINT `comentario_id_pelicula_fkey` FOREIGN KEY (`id_pelicula`) REFERENCES `pelicula`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `actores_peliculas` ADD CONSTRAINT `actores_peliculas_id_actor_fkey` FOREIGN KEY (`id_actor`) REFERENCES `actor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `actores_peliculas` ADD CONSTRAINT `actores_peliculas_id_pelicula_fkey` FOREIGN KEY (`id_pelicula`) REFERENCES `pelicula`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
