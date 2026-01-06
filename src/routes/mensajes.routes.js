import express from 'express';
import MensajeContactoController from '../controllers/MensajeContactoController.js';
import { mensajeContactoValidationRules } from '../validators/mensajeContactoValidator.js';

const router = express.Router();

// GET /api/mensajes
// endpoint para listar todos los mensajes de contacto
// este endpoint solo debe ser usado por el administrador
router.get('/', MensajeContactoController.obtenerTodos);

// POST /api/mensajes
// endpoint para crear un nuevo mensaje de contacto
// este endpoint es publico, cualquier usuario puede enviar un mensaje
// requiere: nombre, email, mensaje (telefono es opcional)
router.post('/', mensajeContactoValidationRules, MensajeContactoController.crear);

// DELETE /api/mensajes/:id
// endpoint para eliminar un mensaje
// solo el administrador puede eliminar mensajes
router.delete('/:id', MensajeContactoController.eliminar);

export default router;
