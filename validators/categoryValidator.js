const { body } = require("express-validator")

const categoryValidator = [
    body("name").notEmpty().isLength({ min: 3 }),
    body("description").optional()
]

module.exports = categoryValidator
