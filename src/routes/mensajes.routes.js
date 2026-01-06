import express from 'express';
import MensajeContactoController from '../controllers/MensajeContactoController.js';
import { mensajeContactoValidationRules } from '../validators/mensajeContactoValidator.js';

const router = express.Router();

/**
 * GET /api/mensajes
 * Listar todos los mensajes (solo admin)
 */
router.get('/', MensajeContactoController.getAll);

/**
 * POST /api/mensajes
 * Crear mensaje de contacto (público)
 */
router.post('/', mensajeContactoValidationRules, MensajeContactoController.create);

/**
 * DELETE /api/mensajes/:id
 * Eliminar mensaje (solo admin)
 */
router.delete('/:id', MensajeContactoController.delete);

export default router;
