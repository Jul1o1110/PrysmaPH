import { validationResult } from 'express-validator';
import MensajeContactoRepository from '../repositories/MensajeContactoRepository.js';
import MensajeContacto from '../models/MensajeContacto.js';

// controlador para manejar los mensajes de contacto
// los usuarios envian mensajes desde el formulario de contacto
class MensajeContactoController {
    // funcion para obtener todos los mensajes de contacto
    // esta funcion solo la debe usar el admin
    async obtenerTodos(req, res) {
        try {
            // busco todos los mensajes en la base de datos
            const mensajes = await MensajeContactoRepository.obtenerTodos();
            
            // creo un array para mandar al frontend
            const mensajesJSON = [];
            
            // recorro todos los mensajes
            for (let i = 0; i < mensajes.length; i++) {
                // convierto cada mensaje a JSON
                const mensajeJSON = mensajes[i].convertirAJSON();
                // lo agrego al array
                mensajesJSON.push(mensajeJSON);
            }
            
            // mando la respuesta
            res.status(200).json(mensajesJSON);
        } catch (error) {
            // si hay error, lo imprimo
            console.error('Error al obtener mensajes:', error);
            res.status(500).json({ error: 'Error interno del servidor al obtener mensajes' });
        }
    }

    // funcion para crear un nuevo mensaje de contacto
    // esta funcion es publica, cualquiera puede enviar un mensaje
    async crear(req, res) {
        try {
            // valido los datos que me mandaron
            const errores = validationResult(req);
            
            if (!errores.isEmpty()) {
                // si hay errores, los mando al cliente
                return res.status(400).json({ errors: errores.array() });
            }

            // creo el mensaje con los datos que recibo
            const mensaje = new MensajeContacto(req.body);
            
            // guardo el mensaje en la base de datos
            const mensajeId = await MensajeContactoRepository.crear(mensaje);

            // mando respuesta exitosa
            res.status(201).json({
                mensaje: 'Mensaje enviado exitosamente',
                id: mensajeId
            });
        } catch (error) {
            // si hay error, lo imprimo
            console.error('Error al crear mensaje:', error);
            res.status(500).json({ error: 'Error interno del servidor al enviar mensaje' });
        }
    }

    // funcion para eliminar un mensaje
    // solo el admin puede eliminar mensajes
    async eliminar(req, res) {
        try {
            // obtengo el id del mensaje
            const id = req.params.id;

            // valido el id
            if (!id) {
                return res.status(400).json({ error: 'ID de mensaje invalido' });
            }
            
            if (isNaN(id)) {
                return res.status(400).json({ error: 'ID de mensaje invalido' });
            }

            // verifico que el mensaje exista
            const mensaje = await MensajeContactoRepository.obtenerPorId(id);
            
            if (!mensaje) {
                // si no existe, mando error
                return res.status(404).json({ error: 'Mensaje no encontrado' });
            }

            // elimino el mensaje
            const eliminado = await MensajeContactoRepository.eliminar(id);

            // verifico que se haya eliminado
            if (!eliminado) {
                return res.status(500).json({ error: 'No se pudo eliminar el mensaje' });
            }

            // mando respuesta exitosa
            res.status(200).json({
                mensaje: 'Mensaje eliminado exitosamente'
            });
        } catch (error) {
            // si hay error, lo imprimo
            console.error('Error al eliminar mensaje:', error);
            res.status(500).json({ error: 'Error interno del servidor al eliminar mensaje' });
        }
    }
}

// exporto una instancia del controlador
export default new MensajeContactoController();
