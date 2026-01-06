import { validationResult } from 'express-validator';
import GaleriaProyectoRepository from '../repositories/GaleriaProyectoRepository.js';
import ProyectoRepository from '../repositories/ProyectoRepository.js';
import GaleriaProyecto from '../models/GaleriaProyecto.js';

/**
 * Controlador para Galería de Proyectos
 */
class GaleriaProyectoController {
    /**
     * Obtener galería de un proyecto específico
     */
    async getByProyecto(req, res) {
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

            const galeria = await GaleriaProyectoRepository.findByProyectoId(id);

            res.status(200).json(galeria.map(img => img.toJSON()));
        } catch (error) {
            console.error('Error al obtener galería:', error);
            res.status(500).json({ error: 'Error interno del servidor al obtener galería' });
        }
    }

    /**
     * Agregar imagen a galería (verificar que proyecto exista)
     */
    async create(req, res) {
        try {
            // Validar datos de entrada
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id_proyecto, url_imagen } = req.body;

            // Verificar que el proyecto exista
            const proyecto = await ProyectoRepository.findById(id_proyecto);
            if (!proyecto) {
                return res.status(404).json({ 
                    error: 'El proyecto especificado no existe. No se puede agregar la imagen.' 
                });
            }

            const galeriaItem = new GaleriaProyecto({ id_proyecto, url_imagen });

            if (!galeriaItem.hasProyecto()) {
                return res.status(400).json({ error: 'ID de proyecto inválido' });
            }

            const imagenId = await GaleriaProyectoRepository.create(galeriaItem);

            res.status(201).json({
                mensaje: 'Imagen agregada a la galería exitosamente',
                id: imagenId,
                id_proyecto,
                url_imagen
            });
        } catch (error) {
            console.error('Error al agregar imagen a galería:', error);
            
            // Manejar error de integridad referencial
            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(404).json({ 
                    error: 'El proyecto especificado no existe' 
                });
            }
            
            res.status(500).json({ error: 'Error interno del servidor al agregar imagen' });
        }
    }

    /**
     * Eliminar imagen de galería
     */
    async delete(req, res) {
        try {
            const { id } = req.params;

            if (!id || isNaN(id)) {
                return res.status(400).json({ error: 'ID de imagen inválido' });
            }

            const eliminado = await GaleriaProyectoRepository.delete(id);

            if (!eliminado) {
                return res.status(404).json({ error: 'Imagen no encontrada' });
            }

            res.status(200).json({
                mensaje: 'Imagen eliminada de la galería exitosamente'
            });
        } catch (error) {
            console.error('Error al eliminar imagen:', error);
            res.status(500).json({ error: 'Error interno del servidor al eliminar imagen' });
        }
    }
}

export default new GaleriaProyectoController();
