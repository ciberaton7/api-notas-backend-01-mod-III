export default class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }

    createCategory = async (req, res) => {
        try {
            // Extraemos el id del usuario del token (req.user viene del authMiddleware)
            const categoryData = { ...req.body, userId: req.user.id };
            const newCategory = await this.categoryService.createCategory(categoryData);
            res.status(201).json(newCategory);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getCategoriesByUserId = async (req, res) => {
        try {
            const categories = await this.categoryService.getCategoriesByUserId(req.user.id);
            res.status(200).json(categories);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}