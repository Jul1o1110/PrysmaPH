import { body } from 'express-validator';

/**
 * Validaciones para Mensaje de Contacto
 */
export const mensajeContactoValidationRules = [
    body('nombre')
        .notEmpty().withMessage('El nombre es requerido')
        .isString().withMessage('El nombre debe ser un texto')
        .isLength({ max: 255 }).withMessage('El nombre no puede exceder 255 caracteres')
        .trim(),
    
    body('email')
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('Debe proporcionar un email válido')
        .normalizeEmail(),
    
    body('telefono')
        .optional({ nullable: true, checkFalsy: true })
        .isString().withMessage('El teléfono debe ser un texto')
        .isLength({ max: 20 }).withMessage('El teléfono no puede exceder 20 caracteres')
        .matches(/^[\d\s\-\+\(\)]+$/).withMessage('El teléfono debe contener solo números y caracteres válidos')
        .trim(),
    
    body('mensaje')
        .notEmpty().withMessage('El mensaje es requerido')
        .isString().withMessage('El mensaje debe ser un texto')
        .isLength({ min: 10 }).withMessage('El mensaje debe tener al menos 10 caracteres')
        .trim()
];
