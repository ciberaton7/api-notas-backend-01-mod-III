import CategoryService from "../../application/use-cases/category.service.js";
import {jest} from '@jest/globals';

// 1. Creamos un simulador de la base de datos como en el ejemplo de las notas, pero esta vez para categorías
const mockCategoryRepository = {
    save: jest.fn(),
    findByUserId: jest.fn()
};

describe('CategoryService - Pruebas Unitarias', () => {
    let categoryService;

    beforeEach(() => {
        // Limpiamos la memoria antes de cada prueba
        jest.clearAllMocks();
        // Le inyectamos el repositorio falso creado antes a nuestro servicio real
        categoryService = new CategoryService(mockCategoryRepository);
    });

    test('Crear (Happy Path): debería crear y guardar una categoría correctamente - Ejercicio extra', async () => {
        // ARRANGE (Preparar los datos de prueba)
        const data = { name: 'Ideas', userId: 'user_123' };
        
        // Le decimos a la base de datos falsa lo que debe responder cuando la llamen
        mockCategoryRepository.save.mockResolvedValue({ id: 'cat_001', ...data });

        // ACT (Ejecutar el método real de tu CategoryService)
        const result = await categoryService.createCategory(data);

        // ASSERT (Verificar que hizo lo correcto)
        expect(mockCategoryRepository.save).toHaveBeenCalledTimes(1); // Se verifica si llamó a la base de datos al menos 1 vez
        expect(result.name).toBe('Ideas'); // ¿El nombre es el correcto?
        expect(result.userId).toBe('user_123'); // ¿El usuario es el correcto?
    });
});