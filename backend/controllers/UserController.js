import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { deleteAllDocumentsForUser } from "./FilesController.js";
import logger from '../config/logger.js';

export const handleSignup = async (req, res) => {
    try {
        console.log('=== SIGNUP REQUEST START ===');
        console.log('Request headers:', req.headers);
        console.log('Request body type:', typeof req.body);
        console.log('Request body keys:', Object.keys(req.body || {}));
        console.log('Full request body:', JSON.stringify(req.body, null, 2));
        console.log('Request body stringified:', JSON.stringify(req.body));
        console.log('Request body direct:', req.body);
        console.log('Body has university?', 'university' in req.body);
        console.log('Body university value:', req.body.university);
        
        const { name, email, password, university, course, branch } = req.body;
        console.log('Destructured values:');
        console.log('- name:', name, typeof name);
        console.log('- email:', email, typeof email);
        console.log('- password:', password ? '***' : 'undefined', typeof password);
        console.log('- university:', university, typeof university);
        console.log('- course:', course, typeof course);
        console.log('- branch:', branch, typeof branch);
        console.log('=== SIGNUP REQUEST DATA END ===');
        if (!name || !email || !password) {
            return res.status(400).json(
                {
                    success: false,
                    error: {
                        message: "Please fill all the fields",
                        code: 'VALIDATION_ERROR'
                    }
                }
            );
        }

        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            console.log("User already exists", existingUser);
            return res.status(400).json(
                {
                    success: false,
                    error: {
                        message: "User already exists",
                        code: 'USER_ALREADY_EXISTS'
                    }
                }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const userData = { name, email, password: hashedPassword, university, course, branch };
        console.log('Creating user with data:', JSON.stringify(userData, null, 2));
        
        const user = await User.create(userData);
        console.log("User created successfully: ", user);

        const token = jwt.sign(
            { userId: user._id, name, email },
            process.env.JWT_SECRET || 'fallback-secret-key',
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
        );

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/',
            maxAge: parseInt(process.env.COOKIE_MAX_AGE) || 3600000,
        });

        return res.status(201).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                university: user.university,
                course: user.course,
                branch: user.branch
            },
            message: "User created successfully",
        });

    } catch (error) {
        logger.error('Error in handleSignup:', error);
        console.error("Detailed error:", error);
        return res.status(500).json(
            {
                success: false,
                error: {
                    message: error.message || "Server error",
                    code: 'SERVER_ERROR'
                }
            }
        );
    }
}

export const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json(
                {
                    success: false,
                    error: {
                        message: "Please fill all the fields",
                        code: 'VALIDATION_ERROR'
                    }
                }
            );
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json(
                {
                    success: false,
                    error: {
                        message: "User not found",
                        code: 'USER_NOT_FOUND'
                    }
                }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json(
                {
                    success: false,
                    error: {
                        message: "Invalid credentials",
                        code: 'INVALID_CREDENTIALS'
                    }
                }
            );
        }

        const token = jwt.sign(
            { userId: user._id, name: user.name, email: user.email },
            process.env.JWT_SECRET || 'fallback-secret-key',
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
        );

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/',
            maxAge: parseInt(process.env.COOKIE_MAX_AGE) || 3600000,
        });

        return res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                university: user.university,
                course: user.course,
                branch: user.branch
            },
            message: "Login successful",
        });

    } catch (error) {
        logger.error('Error in handleLogin:', error);
        console.error("Detailed error:", error);
        return res.status(500).json(
            {
                success: false,
                error: {
                    message: error.message || "Server error",
                    code: 'SERVER_ERROR'
                }
            }
        );
    }
}

export const handleLogout = async (req, res) => {
    try {
        res.clearCookie('authToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/'
        });

        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    } catch (error) {
        logger.error('Error in handleLogout:', error);
        console.error("Detailed error:", error);
        return res.status(500).json(
            {
                success: false,
                error: {
                    message: error.message || "Server error",
                    code: 'SERVER_ERROR'
                }
            }
        );
    }
}

export const handleGetUser = async (req, res) => {
    try {
        const token = req.cookies.authToken;

        if (!token) {
            return res.status(401).json(
                {
                    success: false,
                    error: {
                        message: "Unauthorized",
                        code: 'UNAUTHORIZED'
                    }
                }
            );
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');

        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json(
                {
                    success: false,
                    error: {
                        message: "User not found",
                        code: 'USER_NOT_FOUND'
                    }
                }
            );
        }

        return res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                university: user.university,
                course: user.course,
                branch: user.branch
            },
            message: "User found",
        });

    } catch (error) {
        logger.error('Error in handleGetUser:', error);
        console.error("Detailed error:", error);
        return res.status(500).json(
            {
                success: false,
                error: {
                    message: error.message || "Server error",
                    code: 'SERVER_ERROR'
                }
            }
        );
    }
}

export const checkAuth = async (req, res) => {
    try {
        const token = req.cookies.authToken;

        if (!token) {
            return res.status(401).json(
                {
                    success: false,
                    error: {
                        message: "Unauthorized",
                        code: 'UNAUTHORIZED'
                    }
                }
            );
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');

        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json(
                {
                    success: false,
                    error: {
                        message: "User not found",
                        code: 'USER_NOT_FOUND'
                    }
                }
            );
        }

        return res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                university: user.university,
                course: user.course,
                branch: user.branch
            },
            message: "Authenticated successfully",
        });
    } catch (error) {
        logger.error('Error in checkAuth:', error);
        console.error("Detailed error:", error);
        return res.status(500).json(
            {
                success: false,
                error: {
                    message: error.message || "Server error",
                    code: 'SERVER_ERROR'
                }
            }
        );
    }
};

export const handleDeleteUser = async (req, res) => {
    try {
        const token = req.cookies.authToken;

        if (!token) {
            return res.status(401).json(
                {
                    success: false,
                    error: {
                        message: "Unauthorized",
                        code: 'UNAUTHORIZED'
                    }
                }
            );
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');

        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json(
                {
                    success: false,
                    error: {
                        message: "User not found",
                        code: 'USER_NOT_FOUND'
                    }
                }
            );
        }

        const { deleteUserDocuments } = await import('./FilesController.js');
        await deleteUserDocuments(user._id);
        
        await User.findByIdAndDelete(user._id);

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        logger.error('Error in handleDeleteUser:', error);
        console.error("Detailed error:", error);
        return res.status(500).json(
            {
                success: false,
                error: {
                    message: error.message || "Server error",
                    code: 'SERVER_ERROR'
                }
            }
        );
    }
};