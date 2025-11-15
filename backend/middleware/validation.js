import Joi from 'joi';

export const registerValidation = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(128).required(),
    university: Joi.string().min(2).max(100).required(),
    course: Joi.string().min(2).max(50).required(),
    branch: Joi.string().min(2).max(50).required()
});

export const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(128).required()
});

export const fileUploadValidation = Joi.object({
    university: Joi.string().min(2).max(100).required(),
    course: Joi.string().min(2).max(50).required(),
    branch: Joi.string().min(2).max(50).required(),
    userId: Joi.string().required(),
    documents: Joi.string().required()
});

export const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }
        next();
    };
};