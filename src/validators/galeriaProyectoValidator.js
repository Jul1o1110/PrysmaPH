import { body } from 'express-validator';

// validaciones para agregar una imagen a la galeria de un proyecto
// estas reglas se aplican cuando se quiere agregar una foto a un proyecto
export const galeriaProyectoValidationRules = [
    // validacion del id del proyecto
    // necesito saber a que proyecto le voy a agregar la imagen
    body('id_proyecto')
        .notEmpty().withMessage('El ID del proyecto es requerido')
        .isInt({ min: 1 }).withMessage('El ID del proyecto debe ser un numero entero valido'),
    
    // validacion de la url de la imagen
    // es la direccion donde esta guardada la foto
    body('url_imagen')
        .notEmpty().withMessage('La URL de la imagen es requerida')
        .isString().withMessage('La URL de la imagen debe ser un texto valido')
        .isLength({ max: 255 }).withMessage('La URL de la imagen no puede exceder 255 caracteres')
        .trim() // elimino espacios al inicio y final
];
