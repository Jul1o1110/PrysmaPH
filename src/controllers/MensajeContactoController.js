import { validationResult } from 'express-validator';
import MensajeContactoRepository from '../repositories/MensajeContactoRepository.js';
import MensajeContacto from '../models/MensajeContacto.js';

/**
 * Controlador para Mensajes de Contacto
 */
class MensajeContactoController {
    /**
     * Listar todos los mensajes (solo admin)
     */
    async getAll(req, res) {
        try {
            const mensajes = await MensajeContactoRepository.findAll();
            res.status(200).json(mensajes.map(m => m.toJSON()));
        } catch (error) {
            console.error('Error al obtener mensajes:', error);
            res.status(500).json({ error: 'Error interno del servidor al obtener mensajes' });
        }
    }

    /**
     * Crear mensaje de contacto (público)
     */
    async create(req, res) {
        try {
            // Validar datos de entrada
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const mensaje = new MensajeContacto(req.body);
            const mensajeId = await MensajeContactoRepository.create(mensaje);

            res.status(201).json({
                mensaje: 'Mensaje enviado exitosamente',
                id: mensajeId
            });
        } catch (error) {
            console.error('Error al crear mensaje:', error);
            res.status(500).json({ error: 'Error interno del servidor al enviar mensaje' });
        }
    }

    /**
     * Eliminar mensaje (solo admin)
     */
    async delete(req, res) {
        try {
            const { id } = req.params;

            if (!id || isNaN(id)) {
                return res.status(400).json({ error: 'ID de mensaje inválido' });
            }

            // Verificar que el mensaje exista
            const mensaje = await MensajeContactoRepository.findById(id);
            if (!mensaje) {
                return res.status(404).json({ error: 'Mensaje no encontrado' });
            }

            const eliminado = await MensajeContactoRepository.delete(id);

            if (!eliminado) {
                return res.status(500).json({ error: 'No se pudo eliminar el mensaje' });
            }

            res.status(200).json({
                mensaje: 'Mensaje eliminado exitosamente'
            });
        } catch (error) {
            console.error('Error al eliminar mensaje:', error);
            res.status(500).json({ error: 'Error interno del servidor al eliminar mensaje' });
        }
    }
}

export default new MensajeContactoController();
