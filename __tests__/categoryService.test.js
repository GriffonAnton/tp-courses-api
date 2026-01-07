const sequelize = require("../config/database")
require("../model/Category")
const service = require("../service/categoryService")

beforeAll(async () => {
    await sequelize.sync({ force: true })
})

test("getAllCategories returns array", async () => {
    const categories = await service.getAllCategories()
    expect(Array.isArray(categories)).toBe(true)
})

test("createCategory works", async () => {
    const category = await service.createCategory({ name: "Design" })
    expect(category.name).toBe("Design")
})
