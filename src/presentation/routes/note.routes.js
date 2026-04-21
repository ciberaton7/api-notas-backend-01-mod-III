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
router.post("/", upload.single('image'), noteController.createNote);
router.get("/", noteController.getNotesByUserId);
 
//router.post("/",authMiddleware, upload.single('image'), noteController.createNote);
//router.get("/", authMiddleware, noteController.getNotesByUserId);

//definir las rutas para las notas
//router.post("/",authMiddleware, upload.single('image'),noteController.createNote);
//router.get("/notes",authMiddleware,noteController.getNotesByUserId);


export default router;


//router.post("/notes",uploadMiddleware.single('image'),noteController.createNote);
   // noteController.createNote);