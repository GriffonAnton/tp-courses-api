const swaggerJSDoc = require("swagger-jsdoc")

module.exports = swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Courses API",
            version: "1.0.0"
        }
    },
    apis: ["./router/*.js"]
})
