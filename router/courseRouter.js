const express = require("express")
const router = express.Router()
const courseController = require("../controller/courseController")
const auth = require("../middleware/auth")
const courseValidator = require("../validators/courseValidator")

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Récupère tous les cours publiés
 *     responses:
 *       200:
 *         description: Liste des cours
 */
router.get("/", courseController.getAll)

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Récupère un cours par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cours trouvé
 *       404:
 *         description: Cours non trouvé
 */
router.get("/:id", courseController.getById)

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Crée un nouveau cours
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       201:
 *         description: Cours créé
 */
router.post("/", auth(["admin", "instructor"]), courseValidator, courseController.create)

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Met à jour un cours
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Cours mis à jour
 */
router.put("/:id", auth(["admin", "instructor"]), courseValidator, courseController.update)

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Supprime un cours
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cours supprimé
 */
router.delete("/:id", auth(["admin"]), courseController.delete)

module.exports = router
