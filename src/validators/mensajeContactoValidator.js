import { body } from 'express-validator';

// validaciones para los mensajes de contacto
// estas reglas se aplican cuando un usuario envia un mensaje desde el formulario
export const mensajeContactoValidationRules = [
    // validacion del nombre
    // el nombre de la persona que envia el mensaje es obligatorio
    body('nombre')
        .notEmpty().withMessage('El nombre es requerido')
        .isString().withMessage('El nombre debe ser un texto')
        .isLength({ max: 255 }).withMessage('El nombre no puede exceder 255 caracteres')
        .trim(), // elimino espacios al inicio y final
    
    // validacion del email
    // el email es obligatorio y debe tener formato valido
    body('email')
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('Debe proporcionar un email valido')
        .normalizeEmail(), // normalizo el email (minusculas, etc)
    
    // validacion del telefono
    // el telefono es opcional, el usuario no esta obligado a darlo
    body('telefono')
        .optional({ nullable: true, checkFalsy: true })
        .isString().withMessage('El telefono debe ser un texto')
        .isLength({ max: 20 }).withMessage('El telefono no puede exceder 20 caracteres')
        .matches(/^[\d\s\-\+\(\)]+$/).withMessage('El telefono debe contener solo numeros y caracteres validos')
        .trim(),
    
    // validacion del mensaje
    // el mensaje es obligatorio y debe tener al menos 10 caracteres
    body('mensaje')
        .notEmpty().withMessage('El mensaje es requerido')
        .isString().withMessage('El mensaje debe ser un texto')
        .isLength({ min: 10 }).withMessage('El mensaje debe tener al menos 10 caracteres')
        .trim()
];
