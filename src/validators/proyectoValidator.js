import { body } from 'express-validator';

// validaciones para crear un proyecto nuevo
// estas reglas se aplican cuando alguien quiere agregar un proyecto
export const proyectoValidationRules = [
    // validacion del titulo del proyecto
    // el titulo es obligatorio y no puede estar vacio
    body('titulo')
        .notEmpty().withMessage('El titulo es requerido')
        .isString().withMessage('El titulo debe ser un texto')
        .isLength({ max: 255 }).withMessage('El titulo no puede exceder 255 caracteres')
        .trim(), // elimino espacios al inicio y final
    
    // validacion de la descripcion del proyecto
    // la descripcion es opcional, puede estar vacia
    body('descripcion')
        .optional({ nullable: true, checkFalsy: true })
        .isString().withMessage('La descripcion debe ser un texto')
        .trim(),
    
    // validacion de la imagen principal
    // la imagen principal es obligatoria
    body('imagen_principal')
        .notEmpty().withMessage('La imagen principal es requerida')
        .isString().withMessage('La imagen principal debe ser un texto valido')
        .isLength({ max: 255 }).withMessage('La URL de la imagen no puede exceder 255 caracteres')
        .trim(),
    
    // validacion de la categoria
    // solo puede ser "arquitectura" o "fotografia"
    body('categoria')
        .notEmpty().withMessage('La categoria es requerida')
        .isIn(['arquitectura', 'fotografia']).withMessage('La categoria debe ser "arquitectura" o "fotografia"')
];

// validaciones para actualizar un proyecto existente
// al actualizar, todos los campos son opcionales
export const proyectoUpdateValidationRules = [
    // validacion del titulo (opcional al actualizar)
    body('titulo')
        .optional()
        .isString().withMessage('El titulo debe ser un texto')
        .isLength({ max: 255 }).withMessage('El titulo no puede exceder 255 caracteres')
        .trim(),
    
    // validacion de la descripcion (opcional)
    body('descripcion')
        .optional({ nullable: true, checkFalsy: true })
        .isString().withMessage('La descripcion debe ser un texto')
        .trim(),
    
    // validacion de la imagen principal (opcional)
    body('imagen_principal')
        .optional()
        .isString().withMessage('La imagen principal debe ser un texto valido')
        .isLength({ max: 255 }).withMessage('La URL de la imagen no puede exceder 255 caracteres')
        .trim(),
    
    // validacion de la categoria (opcional)
    body('categoria')
        .optional()
        .isIn(['arquitectura', 'fotografia']).withMessage('La categoria debe ser "arquitectura" o "fotografia"')
];
