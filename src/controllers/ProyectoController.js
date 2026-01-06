import { validationResult } from 'express-validator';
import ProyectoRepository from '../repositories/ProyectoRepository.js';
import Proyecto from '../models/Proyecto.js';

/**
 * Controlador para Proyectos
 */
class ProyectoController {
    /**
     * Listar todos los proyectos, con filtro opcional por categoría
     */
    async getAll(req, res) {
        try {
            const { categoria } = req.query;

            let proyectos;
            if (categoria) {
                // Validar que la categoría sea válida
                if (!['arquitectura', 'fotografia'].includes(categoria)) {
                    return res.status(400).json({
                        error: 'Categoría inválida. Debe ser "arquitectura" o "fotografia"'
                    });
                }
                proyectos = await ProyectoRepository.findByCategoria(categoria);
            } else {
                proyectos = await ProyectoRepository.findAll();
            }

            res.status(200).json(proyectos.map(p => p.toJSON()));
        } catch (error) {
            console.error('Error al obtener proyectos:', error);
            res.status(500).json({ error: 'Error interno del servidor al obtener proyectos' });
        }
    }

    /**
     * Obtener proyecto por ID con su galería
     */
    async getById(req, res) {
        try {
            const { id } = req.params;

            if (!id || isNaN(id)) {
                return res.status(400).json({ error: 'ID de proyecto inválido' });
            }

            const proyecto = await ProyectoRepository.findWithGallery(id);

            if (!proyecto) {
                return res.status(404).json({ error: 'Proyecto no encontrado' });
            }

            res.status(200).json(proyecto);
        } catch (error) {
            console.error('Error al obtener proyecto:', error);
            res.status(500).json({ error: 'Error interno del servidor al obtener proyecto' });
        }
    }

    /**
     * Crear nuevo proyecto
     */
    async create(req, res) {
        try {
            // Validar datos de entrada
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const proyecto = new Proyecto(req.body);

            // Validación adicional de categoría
            if (!proyecto.isValidCategoria()) {
                return res.status(400).json({ 
                    error: 'Categoría inválida. Debe ser "arquitectura" o "fotografia"' 
                });
            }

            const proyectoId = await ProyectoRepository.create(proyecto);
            const nuevoProyecto = await ProyectoRepository.findById(proyectoId);

            res.status(201).json({
                mensaje: 'Proyecto creado exitosamente',
                proyecto: nuevoProyecto.toJSON()
            });
        } catch (error) {
            console.error('Error al crear proyecto:', error);
            res.status(500).json({ error: 'Error interno del servidor al crear proyecto' });
        }
    }

    /**
     * Actualizar proyecto existente
     */
    async update(req, res) {
        try {
            const { id } = req.params;

            if (!id || isNaN(id)) {
                return res.status(400).json({ error: 'ID de proyecto inválido' });
            }

            // Validar datos de entrada
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Verificar que el proyecto exista
            const proyectoExistente = await ProyectoRepository.findById(id);
            if (!proyectoExistente) {
                return res.status(404).json({ error: 'Proyecto no encontrado' });
            }

            const proyecto = new Proyecto({ ...proyectoExistente.toJSON(), ...req.body });

            // Validación adicional de categoría si se proporciona
            if (req.body.categoria && !proyecto.isValidCategoria()) {
                return res.status(400).json({ 
                    error: 'Categoría inválida. Debe ser "arquitectura" o "fotografia"' 
                });
            }

            const actualizado = await ProyectoRepository.update(id, proyecto);

            if (!actualizado) {
                return res.status(500).json({ error: 'No se pudo actualizar el proyecto' });
            }

            const proyectoActualizado = await ProyectoRepository.findById(id);

            res.status(200).json({
                mensaje: 'Proyecto actualizado exitosamente',
                proyecto: proyectoActualizado.toJSON()
            });
        } catch (error) {
            console.error('Error al actualizar proyecto:', error);
            res.status(500).json({ error: 'Error interno del servidor al actualizar proyecto' });
        }
    }

    /**
     * Eliminar proyecto (cascade eliminará galería automáticamente)
     */
    async delete(req, res) {
        try {
            const { id } = req.params;

            if (!id || isNaN(id)) {
                return res.status(400).json({ error: 'ID de proyecto inválido' });
            }

            // Verificar que el proyecto exista
            const proyecto = await ProyectoRepository.findById(id);
            if (!proyecto) {
                return res.status(404).json({ error: 'Proyecto no encontrado' });
            }

            const eliminado = await ProyectoRepository.delete(id);

            if (!eliminado) {
                return res.status(500).json({ error: 'No se pudo eliminar el proyecto' });
            }

            res.status(200).json({
                mensaje: 'Proyecto y su galería eliminados exitosamente'
            });
        } catch (error) {
            console.error('Error al eliminar proyecto:', error);
            res.status(500).json({ error: 'Error interno del servidor al eliminar proyecto' });
        }
    }
}

export default new ProyectoController();
