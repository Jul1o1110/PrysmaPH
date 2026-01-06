import { validationResult } from 'express-validator';
import FotografiaRepository from '../repositories/FotografiaRepository.js';
import Fotografia from '../models/Fotografia.js';

// controlador para manejar las fotografias independientes
// estas son fotos que no pertenecen a ningun proyecto en particular
class FotografiaController {
    // funcion para obtener todas las fotografias
    // tambien permite filtrar por categoria
    async obtenerTodas(req, res) {
        try {
            // obtengo la categoria si la mandaron
            const categoria = req.query.categoria;

            // declaro variable para las fotografias
            let fotografias;
            
            // verifico si me mandaron categoria para filtrar
            if (categoria) {
                // si me mandaron categoria, filtro por ella
                fotografias = await FotografiaRepository.obtenerPorCategoria(categoria);
            } else {
                // si no me mandaron categoria, traigo todas
                fotografias = await FotografiaRepository.obtenerTodas();
            }

            // creo un array para mandar al frontend
            const fotografiasJSON = [];
            
            // recorro todas las fotografias
            for (let i = 0; i < fotografias.length; i++) {
                // convierto cada foto a JSON
                const fotoJSON = fotografias[i].convertirAJSON();
                // la agrego al array
                fotografiasJSON.push(fotoJSON);
            }

            // mando la respuesta
            res.status(200).json(fotografiasJSON);
        } catch (error) {
            // si hay error, lo imprimo
            console.error('Error al obtener fotografias:', error);
            res.status(500).json({ error: 'Error interno del servidor al obtener fotografias' });
        }
    }

    // funcion para crear una nueva fotografia
    async crear(req, res) {
        try {
            // valido los datos que me mandaron
            const errores = validationResult(req);
            
            if (!errores.isEmpty()) {
                // si hay errores, los mando al cliente
                return res.status(400).json({ errors: errores.array() });
            }

            // creo la fotografia con los datos
            const fotografia = new Fotografia(req.body);
            
            // guardo la fotografia en la base de datos
            const fotografiaId = await FotografiaRepository.crear(fotografia);

            // mando respuesta exitosa
            res.status(201).json({
                mensaje: 'Fotografia creada exitosamente',
                id: fotografiaId,
                fotografia: fotografia.convertirAJSON()
            });
        } catch (error) {
            // si hay error, lo imprimo
            console.error('Error al crear fotografia:', error);
            res.status(500).json({ error: 'Error interno del servidor al crear fotografia' });
        }
    }

    // funcion para eliminar una fotografia
    async eliminar(req, res) {
        try {
            // obtengo el id de la fotografia
            const id = req.params.id;

            // valido el id
            if (!id) {
                return res.status(400).json({ error: 'ID de fotografia invalido' });
            }
            
            if (isNaN(id)) {
                return res.status(400).json({ error: 'ID de fotografia invalido' });
            }

            // elimino la fotografia
            const eliminado = await FotografiaRepository.eliminar(id);

            // verifico que se haya eliminado
            if (!eliminado) {
                // si no se elimino, es porque no existe
                return res.status(404).json({ error: 'Fotografia no encontrada' });
            }

            // mando respuesta exitosa
            res.status(200).json({
                mensaje: 'Fotografia eliminada exitosamente'
            });
        } catch (error) {
            // si hay error, lo imprimo
            console.error('Error al eliminar fotografia:', error);
            res.status(500).json({ error: 'Error interno del servidor al eliminar fotografia' });
        }
    }
}

// exporto una instancia del controlador
export default new FotografiaController();
