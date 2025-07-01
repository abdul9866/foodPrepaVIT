const jwt = require('jsonwebtoken');

const authMiddelware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer '))
        return res.status(401).json({ message: "Token missing or malformed" });

    const token = authHeader.split(' ')[1];

    try {
        const token_decode = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Token is invalid" });
    }
};

module.exports = authMiddelware;
