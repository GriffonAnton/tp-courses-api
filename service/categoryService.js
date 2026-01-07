const Category = require("../model/Category")
const Course = require("../model/Course")

exports.getAllCategories = () => Category.findAll({ include: Course })
exports.getCategoryById = (id) => Category.findByPk(id, { include: Course })
exports.createCategory = (data) => Category.create(data)
