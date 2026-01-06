import express from 'express';
import ProyectoController from '../controllers/ProyectoController.js';
import { proyectoValidationRules, proyectoUpdateValidationRules } from '../validators/proyectoValidator.js';

const router = express.Router();

// GET /api/proyectos
// endpoint para listar todos los proyectos
// tambien permite filtrar por categoria usando ?categoria=arquitectura o ?categoria=fotografia
router.get('/', ProyectoController.obtenerTodos);

// GET /api/proyectos/:id
// endpoint para obtener un proyecto especifico por su id
// incluye las imagenes de su galeria
router.get('/:id', ProyectoController.obtenerPorId);

// POST /api/proyectos
// endpoint para crear un nuevo proyecto
// requiere: titulo, descripcion, imagen_principal, categoria
router.post('/', proyectoValidationRules, ProyectoController.crear);

// PUT /api/proyectos/:id
// endpoint para actualizar un proyecto existente
// se pueden actualizar cualquiera de los campos del proyecto
router.put('/:id', proyectoUpdateValidationRules, ProyectoController.actualizar);

// DELETE /api/proyectos/:id
// endpoint para eliminar un proyecto
// tambien elimina todas las imagenes de su galeria automaticamente
router.delete('/:id', ProyectoController.eliminar);

export default router;
