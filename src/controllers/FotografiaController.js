import { validationResult } from 'express-validator';
import FotografiaRepository from '../repositories/FotografiaRepository.js';
import Fotografia from '../models/Fotografia.js';

/**
 * Controlador para Fotografías
 */
class FotografiaController {
    /**
     * Listar todas las fotografías, con filtro opcional por categoría
     */
    async getAll(req, res) {
        try {
            const { categoria } = req.query;

            let fotografias;
            if (categoria) {
                fotografias = await FotografiaRepository.findByCategoria(categoria);
            } else {
                fotografias = await FotografiaRepository.findAll();
            }

            res.status(200).json(fotografias.map(f => f.toJSON()));
        } catch (error) {
            console.error('Error al obtener fotografías:', error);
            res.status(500).json({ error: 'Error interno del servidor al obtener fotografías' });
        }
    }

    /**
     * Crear nueva fotografía
     */
    async create(req, res) {
        try {
            // Validar datos de entrada
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const fotografia = new Fotografia(req.body);
            const fotografiaId = await FotografiaRepository.create(fotografia);

            res.status(201).json({
                mensaje: 'Fotografía creada exitosamente',
                id: fotografiaId,
                fotografia: fotografia.toJSON()
            });
        } catch (error) {
            console.error('Error al crear fotografía:', error);
            res.status(500).json({ error: 'Error interno del servidor al crear fotografía' });
        }
    }

    /**
     * Eliminar fotografía
     */
    async delete(req, res) {
        try {
            const { id } = req.params;

            if (!id || isNaN(id)) {
                return res.status(400).json({ error: 'ID de fotografía inválido' });
            }

            const eliminado = await FotografiaRepository.delete(id);

            if (!eliminado) {
                return res.status(404).json({ error: 'Fotografía no encontrada' });
            }

            res.status(200).json({
                mensaje: 'Fotografía eliminada exitosamente'
            });
        } catch (error) {
            console.error('Error al eliminar fotografía:', error);
            res.status(500).json({ error: 'Error interno del servidor al eliminar fotografía' });
        }
    }
}

export default new FotografiaController();
