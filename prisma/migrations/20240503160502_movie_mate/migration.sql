-- CreateTable
CREATE TABLE `rol` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` ENUM('Admin', 'Usuario', 'Invitado') NOT NULL DEFAULT 'Invitado',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_rol` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `contrasenha` VARCHAR(191) NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL,
    `fecha_eliminado` DATETIME(3) NOT NULL,

    UNIQUE INDEX `usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comentario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` ENUM('positivo', 'negativo') NOT NULL,
    `texto` VARCHAR(191) NOT NULL,
    `id_usuario` INTEGER NOT NULL,
    `id_pelicula` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pelicula` (
    `id` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `genero` VARCHAR(191) NOT NULL,
    `trama` VARCHAR(191) NOT NULL,
    `director` VARCHAR(191) NOT NULL,
    `anho` INTEGER NOT NULL,
    `valoraciones` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `actor` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `fecha_nacimiento` DATETIME(3) NOT NULL,
    `fecha_fallecimiento` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `actores-peliclas` (
    `id_actor` VARCHAR(191) NOT NULL,
    `id_pelicula` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_actor`, `id_pelicula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_id_rol_fkey` FOREIGN KEY (`id_rol`) REFERENCES `rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comentario` ADD CONSTRAINT `comentario_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comentario` ADD CONSTRAINT `comentario_id_pelicula_fkey` FOREIGN KEY (`id_pelicula`) REFERENCES `pelicula`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `actores-peliclas` ADD CONSTRAINT `actores-peliclas_id_actor_fkey` FOREIGN KEY (`id_actor`) REFERENCES `actor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `actores-peliclas` ADD CONSTRAINT `actores-peliclas_id_pelicula_fkey` FOREIGN KEY (`id_pelicula`) REFERENCES `pelicula`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
