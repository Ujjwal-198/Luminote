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
        console.log('=== VALIDATION MIDDLEWARE ===');
        console.log('Request body in validation:', JSON.stringify(req.body, null, 2));
        
        const { error, value } = schema.validate(req.body);
        
        console.log('Validation error:', error);
        console.log('Validation value:', JSON.stringify(value, null, 2));
        
        if (error) {
            console.log('Validation failed:', error.details[0].message);
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }
        
        console.log('Validation passed, proceeding to controller');
        next();
    };
};