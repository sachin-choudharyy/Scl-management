const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1]
try {
    if (token) {
        const decode = jwt.verify(token, "mySecretKey");
        next();
    }
    else {
        return res.status(403).json({
            success:false,
            mesaage:"Token is Required",
            data:{}
        });           
    }
} catch (err) {
    return res.status(401).json({
        success:false,
        mesaage:"invalid token",
        data:{}
    });
}

};

module.exports = verifyToken;





