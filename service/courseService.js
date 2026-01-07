const Course = require("../model/Course")
const Category = require("../model/Category")

exports.getAllCourses = () => Course.findAll({ include: Category })
exports.getCourseById = (id) => Course.findByPk(id, { include: Category })
exports.createCourse = (data) => Course.create(data)
exports.updateCourse = (id, data) => Course.update(data, { where: { id }, returning: true }).then(([rows, [updated]]) => updated)
exports.deleteCourse = (id) => Course.destroy({ where: { id } })
