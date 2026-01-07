const express = require("express")
const app = express()
const sequelize = require("./config/database")
const swaggerUi = require("swagger-ui-express")
const swaggerJsdoc = require("swagger-jsdoc")

const authRouter = require("./router/authRouter")
const courseRouter = require("./router/courseRouter")
const categoryRouter = require("./router/categoryRouter")

app.use(express.json())

// Swagger
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: { title: "Courses API", version: "1.0.0" },
        components: {
            securitySchemes: {
                bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
            }
        }
    },
    apis: ["./router/*.js"]
}
const swaggerSpec = swaggerJsdoc(swaggerOptions)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Routes
app.use("/auth", authRouter)
app.use("/courses", courseRouter)
app.use("/categories", categoryRouter)

// Sync DB et lancer serveur
sequelize.sync().then(() => {
    console.log("Database synced")
    app.listen(3000, () => console.log("Server running on port 3000"))
})
