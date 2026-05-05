import { Router } from "express";
import CategoryController from '../controllers/category.controller.js';
import CategoryService from "../../application/use-cases/category.service.js";
import CategoryMongoRepository from '../../infraestructure/database/mongo/category.mongo.repository.js';
import { authMiddleware } from "../middlewares/auth.middleware.js";

// Aplicamos las nuevas dependencias
const categoryRepository = new CategoryMongoRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

const router = Router();

// Rutas protegidas con JWT
router.post("/", authMiddleware, categoryController.createCategory);
router.get("/", authMiddleware, categoryController.getCategoriesByUserId);

export default router;