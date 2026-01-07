const jwt = require("jsonwebtoken")

module.exports = (roles = []) => (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ message: "Token manquant" })

    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret")
        req.user = decoded
        if (roles.length && !roles.includes(decoded.role)) {
            return res.status(403).json({ message: "Accès refusé" })
        }
        next()
    } catch (err) {
        return res.status(401).json({ message: "Token invalide" })
    }
}
