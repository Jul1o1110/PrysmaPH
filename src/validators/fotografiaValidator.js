import { body } from 'express-validator';

/**
 * Validaciones para Fotografía
 */
export const fotografiaValidationRules = [
    body('url_imagen')
        .notEmpty().withMessage('La URL de la imagen es requerida')
        .isString().withMessage('La URL de la imagen debe ser un texto válido')
        .isLength({ max: 255 }).withMessage('La URL de la imagen no puede exceder 255 caracteres')
        .trim(),
    
    body('categoria')
        .notEmpty().withMessage('La categoría es requerida')
        .isString().withMessage('La categoría debe ser un texto')
        .isLength({ max: 50 }).withMessage('La categoría no puede exceder 50 caracteres')
        .trim(),
    
    body('alt_text')
        .optional({ nullable: true, checkFalsy: true })
        .isString().withMessage('El texto alternativo debe ser un texto')
        .isLength({ max: 255 }).withMessage('El texto alternativo no puede exceder 255 caracteres')
        .trim()
];
