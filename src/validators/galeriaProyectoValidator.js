import { body } from 'express-validator';

/**
 * Validaciones para Galería de Proyecto
 */
export const galeriaProyectoValidationRules = [
    body('id_proyecto')
        .notEmpty().withMessage('El ID del proyecto es requerido')
        .isInt({ min: 1 }).withMessage('El ID del proyecto debe ser un número entero válido'),
    
    body('url_imagen')
        .notEmpty().withMessage('La URL de la imagen es requerida')
        .isString().withMessage('La URL de la imagen debe ser un texto válido')
        .isLength({ max: 255 }).withMessage('La URL de la imagen no puede exceder 255 caracteres')
        .trim()
];
