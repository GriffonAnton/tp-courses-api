const courseService = require("../service/courseService")

exports.getAll = async (req, res) => {
    const courses = await courseService.getAllCourses()
    res.json(courses)
}

exports.getById = async (req, res) => {
    const course = await courseService.getCourseById(req.params.id)
    if (!course) return res.status(404).json({ message: "Cours non trouvé" })
    res.json(course)
}

exports.create = async (req, res) => {
    try {
        const course = await courseService.createCourse(req.body)
        res.status(201).json(course)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.update = async (req, res) => {
    try {
        const course = await courseService.updateCourse(req.params.id, req.body)
        res.json(course)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.delete = async (req, res) => {
    try {
        await courseService.deleteCourse(req.params.id)
        res.json({ message: "Cours supprimé" })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
