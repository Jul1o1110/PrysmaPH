import { body } from 'express-validator';

// validaciones para las fotografias independientes
// estas son fotos que no pertenecen a ningun proyecto en particular
export const fotografiaValidationRules = [
    // validacion de la url de la imagen
    // es obligatoria porque necesito saber donde esta la foto
    body('url_imagen')
        .notEmpty().withMessage('La URL de la imagen es requerida')
        .isString().withMessage('La URL de la imagen debe ser un texto valido')
        .isLength({ max: 255 }).withMessage('La URL de la imagen no puede exceder 255 caracteres')
        .trim(), // elimino espacios al inicio y final
    
    // validacion de la categoria
    // cada foto debe tener una categoria para poder organizarlas
    body('categoria')
        .notEmpty().withMessage('La categoria es requerida')
        .isString().withMessage('La categoria debe ser un texto')
        .isLength({ max: 50 }).withMessage('La categoria no puede exceder 50 caracteres')
        .trim(),
    
    // validacion del texto alternativo
    // el texto alternativo es opcional
    // sirve para accesibilidad y SEO
    body('alt_text')
        .optional({ nullable: true, checkFalsy: true })
        .isString().withMessage('El texto alternativo debe ser un texto')
        .isLength({ max: 255 }).withMessage('El texto alternativo no puede exceder 255 caracteres')
        .trim()
];
