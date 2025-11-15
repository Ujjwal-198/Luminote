import jwt from 'jsonwebtoken';
import User from '../Models/UserModel.js';

export const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies.authToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                error: {
                    message: "Access denied. Please login to continue.",
                    code: 'UNAUTHORIZED'
                }
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({
                success: false,
                error: {
                    message: "User not found. Please login again.",
                    code: 'USER_NOT_FOUND'
                }
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: {
                message: "Invalid token. Please login again.",
                code: 'INVALID_TOKEN'
            }
        });
    }
};