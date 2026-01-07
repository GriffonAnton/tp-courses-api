const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")
const Course = require("./Course")

const Category = sequelize.define("Category", {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: DataTypes.TEXT
})

Category.hasMany(Course, { foreignKey: "categoryId" })
Course.belongsTo(Category, { foreignKey: "categoryId" })

module.exports = Category
