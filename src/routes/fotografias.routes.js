import express from 'express';
import FotografiaController from '../controllers/FotografiaController.js';
import { fotografiaValidationRules } from '../validators/fotografiaValidator.js';

const router = express.Router();

/**
 * GET /api/fotografias
 * Listar todas las fotografías (con filtro opcional por categoría via query param)
 */
router.get('/', FotografiaController.getAll);

/**
 * POST /api/fotografias
 * Crear nueva fotografía
 */
router.post('/', fotografiaValidationRules, FotografiaController.create);

/**
 * DELETE /api/fotografias/:id
 * Eliminar fotografía
 */
router.delete('/:id', FotografiaController.delete);

export default router;
