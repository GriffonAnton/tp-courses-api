const sequelize = require("../config/database")
require("../model/Category")
require("../model/Course")
const service = require("../service/courseService")

beforeAll(async () => {
    await sequelize.sync({ force: true })
    const Category = require("../model/Category")
    await Category.create({ name: "Dev" })
})

test("getAllCourses returns array", async () => {
    const courses = await service.getAllCourses()
    expect(Array.isArray(courses)).toBe(true)
})

test("createCourse works", async () => {
    const course = await service.createCourse({
        title: "Node",
        description: "Cours Node complet",
        duration: 120,
        level: "débutant",
        price: 50,
        instructor: "Admin",
        categoryId: 1
    })
    expect(course.title).toBe("Node")
})

test("getCourseById works", async () => {
    const course = await service.getCourseById(1)
    expect(course).not.toBeNull()
})
