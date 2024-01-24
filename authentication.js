const jwt = require('jsonwebtoken');
const userModel = require("./userModel/usermodel");
//const depositmodel= require("./depositModel/depositmodel")
exports.authenticateUser = async (req, res, next) => {
    try {
        const token = req.header.authorization

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - Missing token' });
        }

        const decoded = jwt.verify(token, 'your-secret-key'); // Change 'your-secret-key' to your actual secret key

        const user = await userModel.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized - User not found' });
        }

        req.user = user; // Attach the user object to the request for later use
        next(); // Continue to the
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}