import jwt from "jsonwebtoken";
import User from "../models/user-model.js";

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Unauthorized access, token not provided" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.findOne({ email: decoded.email }).select('-password');
        if (!user) {
            return res.status(401).json({ message: "Unauthorized, user not found" });
        }

        req.user = user;
        req.userId = user._id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized, token invalid" });
    }
};
