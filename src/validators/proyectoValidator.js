import { body } from 'express-validator';

/**
 * Validaciones para Proyecto
 */
export const proyectoValidationRules = [
    body('titulo')
        .notEmpty().withMessage('El título es requerido')
        .isString().withMessage('El título debe ser un texto')
        .isLength({ max: 255 }).withMessage('El título no puede exceder 255 caracteres')
        .trim(),
    
    body('descripcion')
        .optional({ nullable: true, checkFalsy: true })
        .isString().withMessage('La descripción debe ser un texto')
        .trim(),
    
    body('imagen_principal')
        .notEmpty().withMessage('La imagen principal es requerida')
        .isString().withMessage('La imagen principal debe ser un texto válido')
        .isLength({ max: 255 }).withMessage('La URL de la imagen no puede exceder 255 caracteres')
        .trim(),
    
    body('categoria')
        .notEmpty().withMessage('La categoría es requerida')
        .isIn(['arquitectura', 'fotografia']).withMessage('La categoría debe ser "arquitectura" o "fotografia"')
];

export const proyectoUpdateValidationRules = [
    body('titulo')
        .optional()
        .isString().withMessage('El título debe ser un texto')
        .isLength({ max: 255 }).withMessage('El título no puede exceder 255 caracteres')
        .trim(),
    
    body('descripcion')
        .optional({ nullable: true, checkFalsy: true })
        .isString().withMessage('La descripción debe ser un texto')
        .trim(),
    
    body('imagen_principal')
        .optional()
        .isString().withMessage('La imagen principal debe ser un texto válido')
        .isLength({ max: 255 }).withMessage('La URL de la imagen no puede exceder 255 caracteres')
        .trim(),
    
    body('categoria')
        .optional()
        .isIn(['arquitectura', 'fotografia']).withMessage('La categoría debe ser "arquitectura" o "fotografia"')
];
