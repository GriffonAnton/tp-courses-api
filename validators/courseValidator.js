const { body } = require("express-validator")

const courseValidator = [
    body("title").notEmpty().isLength({ min: 3 }),
    body("description").notEmpty().isLength({ min: 10 }),
    body("duration").isInt({ min: 1 }),
    body("level").isIn(["débutant", "intermédiaire", "avancé"]),
    body("price").isFloat({ min: 0 }),
    body("instructor").notEmpty(),
    body("categoryId").isInt({ min: 1 })
]

module.exports = courseValidator
