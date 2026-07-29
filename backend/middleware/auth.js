const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "No token, access denied" });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const foundUser = await User.findById(decoded.id);

        if (!foundUser) {
            return res.status(401).json({ message: "user not found" });
        }

        req.user = foundUser;
        next();

    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = protect;