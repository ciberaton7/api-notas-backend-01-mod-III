import { Router } from "express";
import AuthController from '../controllers/auth.controller.js';
import AuthService from "../../application/use-cases/auth.service.js";
import UserMongoRepository from '../../infraestructure/database/mongo/user.mongo.repository.js';
import {authMiddleware} from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

//inyeccion de dependencias
const userRepository = new UserMongoRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

const router = Router();
//definir las rutas para la autenticacion
// definir las rutas para la autenticacion

/**
 * @swagger
 * /auth/register:
 *  post:
 *      summary: Registrar un nuevo usuario en el sistema
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required: [name, email, password]
 *                  properties:
 *                      name:
 *                          type: string
 *                          example: Ahmed Alvarado
 *                      email:
 *                          type: string
 *                          example: ahmedminato@gmail.com
 *                      password:
 *                          type: string
 *                          example: miPasswordSeguro123
 *                      role:
 *                          type: string
 *                          enum: [user, admin]
 *                          default: user
 *                          example: admin
 *                      responses:
 *                          201:
 *                              description: Usuario registrado exitosamente (Principio RESTful)
 *                          400:
 *                              description: Error en los datos enviados o el correo ya existe
 *                          500:
 *                              description: Error interno del servidor
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /auth/login:
 *  post:
 *      summary: Iniciar sesión y obtener el token de acceso (JWT)
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required: [email, password]
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: ahmedminato@gmail.com
 *                          password:
 *                              type: string
 *                              example: miPasswordSeguro123
 *                      responses:
 *                          200:
 *                              description: Login exitoso, devuelve el token y los datos del usuario
 *                          400:
 *                              description: Falta email o contraseña
 *                          401:
 *                              description: Credenciales inválidas (Principio RESTful)
 */
router.post("/login", authController.login);

export default router;