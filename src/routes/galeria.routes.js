import express from 'express';
import GaleriaProyectoController from '../controllers/GaleriaProyectoController.js';
import { galeriaProyectoValidationRules } from '../validators/galeriaProyectoValidator.js';

const router = express.Router();

/**
 * GET /api/proyectos/:id/galeria
 * Obtener galería de un proyecto específico
 */
router.get('/proyectos/:id/galeria', GaleriaProyectoController.getByProyecto);

/**
 * POST /api/galeria
 * Agregar imagen a galería
 */
router.post('/galeria', galeriaProyectoValidationRules, GaleriaProyectoController.create);

/**
 * DELETE /api/galeria/:id
 * Eliminar imagen de galería
 */
router.delete('/galeria/:id', GaleriaProyectoController.delete);

export default router;
