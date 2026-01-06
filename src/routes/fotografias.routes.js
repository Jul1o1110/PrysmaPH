import express from 'express';
import FotografiaController from '../controllers/FotografiaController.js';
import { fotografiaValidationRules } from '../validators/fotografiaValidator.js';

const router = express.Router();

// GET /api/fotografias
// endpoint para listar todas las fotografias independientes
// permite filtrar por categoria usando ?categoria=nombre_categoria
router.get('/', FotografiaController.obtenerTodas);

// POST /api/fotografias
// endpoint para crear una nueva fotografia independiente
// requiere: url_imagen, categoria (alt_text es opcional)
router.post('/', fotografiaValidationRules, FotografiaController.crear);

// DELETE /api/fotografias/:id
// endpoint para eliminar una fotografia
// requiere el id de la fotografia
router.delete('/:id', FotografiaController.eliminar);

export default router;
