const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Course = sequelize.define("Course", {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    duration: { type: DataTypes.INTEGER, allowNull: false },
    level: { type: DataTypes.STRING },
    price: { type: DataTypes.FLOAT, allowNull: false },
    published: { type: DataTypes.BOOLEAN, defaultValue: false },
    instructor: { type: DataTypes.STRING, allowNull: false }
})

module.exports = Course
