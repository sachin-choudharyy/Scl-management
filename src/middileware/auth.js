const jwt = require("jsonwebtoken");
var atob = require('atob');


const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    try {
        if (token) {
            const match = jwt.verify(token, "mySecretKey");
            const decode = atob(token.split('.')[1]);    //for decode jwt 
            console.log(decode, "decode");
            req.decode = decode;
            next();
        }
        else {
            return res.status(403).json({
                success: false,
                mesaage: "Token is Required",
                data: {}
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            success: false,
            mesaage: "invalid token",
            data: {}
        });
    }

};

module.exports = verifyToken;





