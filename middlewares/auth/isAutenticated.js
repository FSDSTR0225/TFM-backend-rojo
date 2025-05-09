const jwt = require("jsonwebtoken")

const isAuthenticated = (req, res , next) =>{
    console.log("Encabezado de autorización:", req.headers.authorization);
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({msg: "No estás autenticado"})
    }
    const token = authHeader.split(" ")[1]
    console.log("Token extraído:", token);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("Token decodificado:", decoded);
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({msg:"Token Inválido o expriado"})
    }
}

module.exports = isAuthenticated