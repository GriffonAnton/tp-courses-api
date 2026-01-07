const categoryService = require("../service/categoryService")

exports.getAll = async (req, res) => {
    const categories = await categoryService.getAllCategories()
    res.json(categories)
}

exports.getById = async (req, res) => {
    const category = await categoryService.getCategoryById(req.params.id)
    if (!category) return res.status(404).json({ message: "Catégorie non trouvée" })
    res.json(category)
}

exports.create = async (req, res) => {
    try {
        const category = await categoryService.createCategory(req.body)
        res.status(201).json(category)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
