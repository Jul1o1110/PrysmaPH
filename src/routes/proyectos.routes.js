import express from 'express';
import ProyectoController from '../controllers/ProyectoController.js';
import { proyectoValidationRules, proyectoUpdateValidationRules } from '../validators/proyectoValidator.js';

const router = express.Router();

/**
 * GET /api/proyectos
 * Listar todos los proyectos (con filtro opcional por categoría via query param)
 */
router.get('/', ProyectoController.getAll);

/**
 * GET /api/proyectos/:id
 * Obtener proyecto por ID con su galería
 */
router.get('/:id', ProyectoController.getById);

/**
 * POST /api/proyectos
 * Crear nuevo proyecto
 */
router.post('/', proyectoValidationRules, ProyectoController.create);

/**
 * PUT /api/proyectos/:id
 * Actualizar proyecto existente
 */
router.put('/:id', proyectoUpdateValidationRules, ProyectoController.update);

/**
 * DELETE /api/proyectos/:id
 * Eliminar proyecto (cascade a galería)
 */
router.delete('/:id', ProyectoController.delete);

export default router;
