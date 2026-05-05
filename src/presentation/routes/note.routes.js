import { Router } from "express";
import NoteController from '../controllers/note.controller.js';

import NoteMongoRepository from '../../infraestructure/database/mongo/note.mongo.repository.js';
import NoteMysqlRepository from '../../infraestructure/database/mysql/note.mysql.repository.js';
import NoteService from "../../application/use-cases/note.service.js";
import upload from "../middlewares/upload.middleware.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

//inyeccion de dependencias

const noteRepository = new NoteMongoRepository();
 //const noteRepository = new NoteMysqulRepository();

const noteService = new NoteService(noteRepository);
const noteController = new NoteController(noteService);

const router = Router();
//definir las rutas para las notas  
//comentado sin seguuridad

/**
 * @swagger
 *    /notes:
 *       post:
 *          summary: Crear una nueva nota
 *          tags: [Notes]
 *          requestBody:
 *             required: true
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      required: [title, content]
 *                      properties:
 *                         title:
 *                            type: string
 *                            example: Mi primera nota
 *                         content:
 *                            type: string
 *                            example: Contenido de prueba para la nota
 *                      responses:
 *                         201:
 *                            description: Nota creada exitosamente (Principio RESTful)
 *                         400:
 *                            description: Error en la creación
 */
router.post("/", upload.single('image'), noteController.createNote);

// Ruta para obtener una nota pública por su ID, sin necesidad de autenticación solicitada en el ejercicio 3.3
/**
 * @swagger
 *    /notes/{id}/public:
 *       get:
 *          summary: Obtener una nota de forma pública (sin token)
 *          description: Devuelve los detalles de una nota específica siempre y cuando NO sea privada.
 *          tags: [Notes]
 *          parameters:
 *             -  in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: El ID de la nota que se quiere visualizar
 *          responses:
 *             200:
 *                description: Nota pública obtenida exitosamente
 *             403:
 *                description: Acceso denegado (La nota existe pero es privada)
 *             404:
 *                description: La nota no fue encontrada en la base de datos
 */
router.get("/:id/public", noteController.getPublicNote);

/**
 * @swagger
 *    /notes:
 *       get:
 *          summary: Obtener todas las notas del usuario autenticado
 *          tags: [Notes]
 *          security:
 *             - bearerAuth: []
 *          responses:
 *             200:
 *                description: Lista de notas obtenida exitosamente
 *          401:
 *              description: No autorizado, token faltante o inválido / no se encontraron notas
 */
router.get("/", authMiddleware, noteController.getNotesByUserId);
//router.get("/", noteController.getNotesByUserId);
 
//router.post("/",authMiddleware, upload.single('image'), noteController.createNote);
//router.get("/", authMiddleware, noteController.getNotesByUserId);

//definir las rutas para las notas
//router.post("/",authMiddleware, upload.single('image'),noteController.createNote);
//router.get("/notes",authMiddleware,noteController.getNotesByUserId);

// 1. Las tres rutas NUEVAS para la primera tarea (Tarea 1: Implementado getById, update y delete)

/**
 * @swagger
 *    /notes/{id}:
 *       get:
 *          summary: Obtener una nota por su ID
 *          tags: [Notes]
 *          parameters:
 *             -  in: path
 *                name: id
 *                schema:
 *                   type: string
 *                required: true
 *                description: El ID de la nota
 *          responses:
 *             200:
 *                description: Nota encontrada
 *             404:
 *                description: Nota no encontrada (Principio RESTful)
 */
router.get("/:id", noteController.getNoteById); 

/**
 * @swagger
 *    /notes/{id}:
 *       put:
 *          summary: Actualizar una nota existente
 *          tags: [Notes]
 *          security:
 *             - bearerAuth: []
 *          parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                 type: string
 *               required: true
 *               description: El ID de la nota a actualizar
 *          requestBody:
 *             required: true
 *             content:
 *                application/json:
 *                   schema:
 *                      type: object
 *                      properties:
 *                         title:
 *                            type: string
 *                            example: Título actualizado
 *                         content:
 *                            type: string
 *                            example: Contenido actualizado
 *          responses:
 *             200:
 *                description: Nota actualizada correctamente
 *             401:
 *                description: No autorizado, falta token JWT (Principio RESTful)
 *             400:
 *                description: Error en los datos enviados
 */
router.put("/:id", authMiddleware,noteController.updateNote);

/**
 * @swagger
 *    /notes/{id}:
 *       delete:
 *          summary: Eliminar una nota por su ID
 *          tags: [Notes]
 *          security:
 *             - bearerAuth: []
 *          parameters:
 *             - in: path
 *               name: id
 *               schema:
 *                 type: string
 *               required: true
 *               description: El ID de la nota a eliminar
 *          responses:
 *             200:
 *                description: Nota eliminada correctamente
 *             401:
 *                description: No autorizado, falta token JWT (Principio RESTful)
 *             400:
 *                description: Error al eliminar la nota
 */
router.delete("/:id", authMiddleware, noteController.deleteNote);



export default router;


//router.post("/notes",uploadMiddleware.single('image'),noteController.createNote);
   // noteController.createNote);