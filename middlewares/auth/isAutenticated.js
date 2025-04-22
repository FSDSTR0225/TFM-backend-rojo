const jwt = require("jsonwebtoken")

const isAuthenticated = (req, res , next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Baarer ")){
        return res.status(401).json({msg: "No estás autenticado"})
    }
    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({msg:"Token Inválido o expriado"})
    }
}

module.exports = isAuthenticated