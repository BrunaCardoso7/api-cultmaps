const jwt = require("jsonwebtoken");

function checkToken(req, res, next){
    const authHeader = req.header["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    try {
        const secret = process.env.SECRET

        jwt.verify(token, secret)
        next()
    } catch (error) {
        res.status(400).json({msg:"Token not is validated"})
    }
}

module.exports = checkToken