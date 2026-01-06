import express from 'express';
import GaleriaProyectoController from '../controllers/GaleriaProyectoController.js';
import { galeriaProyectoValidationRules } from '../validators/galeriaProyectoValidator.js';

const router = express.Router();

// GET /api/proyectos/:id/galeria
// endpoint para obtener todas las imagenes de la galeria de un proyecto
// requiere el id del proyecto
router.get('/proyectos/:id/galeria', GaleriaProyectoController.obtenerPorProyecto);

// POST /api/galeria
// endpoint para agregar una nueva imagen a la galeria de un proyecto
// requiere: id_proyecto, url_imagen
router.post('/galeria', galeriaProyectoValidationRules, GaleriaProyectoController.crear);

// DELETE /api/galeria/:id
// endpoint para eliminar una imagen de la galeria
// requiere el id de la imagen
router.delete('/galeria/:id', GaleriaProyectoController.eliminar);

export default router;
