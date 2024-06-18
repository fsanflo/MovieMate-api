import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { HttpStatus } from "../shared/enums/httpStatus.enum";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.SALT || "";

export class AuthController {
    static async registrarUsuario(req: Request, res: Response) {
        const usuario = req.body;

        const usuarioExiste = await prisma.usuario.findFirst({
            where: {
                email: usuario.email,
            },
        });

        if (usuarioExiste) {
            return res.status(HttpStatus.BAD_REQUEST).send({
                message: "Este correo ya está registrado",
            });
        }

        if (!usuario.idRol) {
            usuario.idRol = 2; // Rol Usuario
        }
        try {
            const passwordHash = await bcrypt.hash(usuario.contrasenha, 10);
            usuario.contrasenha = passwordHash;
            usuario.fechaCreacion = new Date();

            const usuarioCreado = await prisma.usuario.create({
                data: usuario,
            });

            if (!usuarioCreado) {
                return res.status(HttpStatus.BAD_REQUEST).send({
                    message: "No se pudo crear el usuario",
                });
            }
            return res.status(HttpStatus.CREATED).send({ usuarioCreado });
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: "Error al procesar el usuario",
            });
        }
    }

    static async loginUsuario(req: Request, res: Response) {
        const { email, contrasenha } = req.body;
        const usuario = await prisma.usuario.findUnique({
            where: {
                email,
                fechaEliminado: null
            },
        });

        if (!usuario) {
            return res.status(HttpStatus.UNAUTHORIZED).send({ error: 'Este usuario no existe' });
        }

        const contrasenhaValida = await bcrypt.compare(contrasenha, usuario.contrasenha);
        if (!contrasenhaValida) {
            return res.status(HttpStatus.UNAUTHORIZED).send({ error: 'Correo o contraseña incorrectos' });
        }

        const token = jwt.sign({ userId: usuario.id, rol: usuario.idRol }, JWT_SECRET, { expiresIn: '12h' });

        res.status(HttpStatus.OK).json({ token, role: usuario.idRol });
    }

    static async listarUsuarios(req: Request, res: Response) {
        const listaUsuarios = await prisma.usuario.findMany({
            where: {
                fechaEliminado: null,
            },
            select: {
                id: true,
                idRol: true,
                nombre: true,
                email: true,
                rol: {
                    select: {
                        tipo: true
                    }
                }
            }
        });
        if (!listaUsuarios) {
            return res.status(HttpStatus.NOT_FOUND).send({ error: 'No se encontraron usuarios' });
        }

        return res.status(HttpStatus.OK).send(listaUsuarios);
    }

    static async datosUsuario(req: Request, res: Response) {
        const usuarioId = +req.params.id
        const usuario = await prisma.usuario.findFirst({
            where: {
                id: usuarioId,
            },
            include: {
                rol: true
            }
        })

        return res.status(HttpStatus.OK).send(usuario);
    }

    static async obtenerRoles(req: Request, res: Response) {
        const roles = await prisma.rol.findMany({});
        console.log(roles)
        return res.status(HttpStatus.OK).send(roles);


    }

    static async actualizarUsuario(req: Request, res: Response) {
        const id = +req.params.id;
        const datosUsuario = req.body
        const usuario = await prisma.usuario.update({
            data: datosUsuario,
            where: {
                id,
            }
        })
        return res.status(HttpStatus.OK).send(usuario);
    }
}
