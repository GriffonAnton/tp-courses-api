const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../model/User")

exports.register = async (data) => {
    const exists = await User.findOne({ where: { email: data.email } })
    if (exists) return null
    const hash = await bcrypt.hash(data.password, 10)
    return User.create({ ...data, password: hash })
}

exports.login = async (email, password) => {
    const user = await User.findOne({ where: { email } })
    if (!user) return null
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return null
    return jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    )
}
