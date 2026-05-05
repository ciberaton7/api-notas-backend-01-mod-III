import CategoryEntity from "../../domain/entities/category.entity.js";

export default class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async createCategory(data) {
        if (!data.name) throw new Error("El nombre de la categoría es obligatorio");
        if (!data.userId) throw new Error("El usuario es obligatorio para crear la categoría");
        
        const category = new CategoryEntity(data);
        return await this.categoryRepository.save(category);
    }

    async getCategoriesByUserId(userId) {
        return await this.categoryRepository.findByUserId(userId);
    }
}