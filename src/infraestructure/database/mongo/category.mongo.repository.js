import CategoryModel from './category.model.js';
import CategoryEntity from '../../../domain/entities/category.entity.js';

export default class CategoryMongoRepository {
    async save(categoryData) {
        const category = new CategoryModel(categoryData);
        const savedCategory = await category.save();
        return new CategoryEntity({
            id: savedCategory._id,
            name: savedCategory.name,
            userId: savedCategory.userId
        });
    }

    async findByUserId(userId) {
        const categories = await CategoryModel.find({ userId });
        return categories.map(cat => new CategoryEntity({
            id: cat._id,
            name: cat.name,
            userId: cat.userId
        }));
    }
}