const sequelize = require("../config/database")
const Category = require("../model/Category")
const Course = require("../model/Course")
const User = require("../model/User")
const bcrypt = require("bcrypt")

async function seed() {
    await sequelize.sync({ force: true })

    const dev = await Category.create({
        name: "Développement",
        description: "Cours de programmation"
    })

    const design = await Category.create({
        name: "Design",
        description: "UX / UI"
    })

    await Course.create({
        title: "Node.js",
        description: "Cours Node.js complet",
        duration: 180,
        level: "débutant",
        price: 50,
        published: true,
        instructor: "Admin",
        categoryId: dev.id
    })

    await Course.create({
        title: "UX Design",
        description: "Bases du design UX",
        duration: 120,
        level: "intermédiaire",
        price: 40,
        published: true,
        instructor: "Designer",
        categoryId: design.id
    })

    const password = await bcrypt.hash("password123", 10)

    await User.create({
        username: "admin",
        email: "admin@test.com",
        password,
        role: "admin"
    })

    await User.create({
        username: "teacher",
        email: "teacher@test.com",
        password,
        role: "instructor"
    })

    console.log("Database initialized")
    process.exit()
}

seed()
