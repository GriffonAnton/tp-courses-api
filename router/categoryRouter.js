const express = require("express")
const router = express.Router()
const categoryController = require("../controller/categoryController")
const auth = require("../middleware/auth")
const categoryValidator = require("../validators/categoryValidator")

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Récupère toutes les catégories
 *     responses:
 *       200:
 *         description: Liste des catégories
 */
router.get("/", categoryController.getAll)

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Récupère une catégorie par son ID avec ses cours
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Catégorie trouvée
 *       404:
 *         description: Catégorie non trouvée
 */
router.get("/:id", categoryController.getById)

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Crée une catégorie
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Catégorie créée
 */
router.post("/", auth(["admin"]), categoryValidator, categoryController.create)

module.exports = router
