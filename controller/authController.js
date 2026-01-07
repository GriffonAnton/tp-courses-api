const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../model/User")

exports.register = async (req, res) => {
    try {
        const hashed = await bcrypt.hash(req.body.password, 10)
        const user = await User.create({ ...req.body, password: hashed })
        res.status(201).json(user)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } })
        if (!user) return res.status(400).json({ message: "Utilisateur non trouvé" })

        const valid = await bcrypt.compare(req.body.password, user.password)
        if (!valid) return res.status(400).json({ message: "Mot de passe incorrect" })

        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET || "secret", { expiresIn: "24h" })
        res.json({ token })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
