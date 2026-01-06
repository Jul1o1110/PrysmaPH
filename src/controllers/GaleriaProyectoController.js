import { validationResult } from 'express-validator';
import GaleriaProyectoRepository from '../repositories/GaleriaProyectoRepository.js';
import ProyectoRepository from '../repositories/ProyectoRepository.js';
import GaleriaProyecto from '../models/GaleriaProyecto.js';

// controlador para manejar la galeria de imagenes de los proyectos
// cada proyecto puede tener varias imagenes en su galeria
class GaleriaProyectoController {
    // funcion para obtener todas las imagenes de la galeria de un proyecto
    async obtenerPorProyecto(req, res) {
        try {
            // obtengo el id del proyecto de los parametros
            const id = req.params.id;

            // valido que el id sea valido
            if (!id) {
                return res.status(400).json({ error: 'ID de proyecto invalido' });
            }
            
            if (isNaN(id)) {
                return res.status(400).json({ error: 'ID de proyecto invalido' });
            }

            // verifico que el proyecto exista primero
            const proyecto = await ProyectoRepository.obtenerPorId(id);
            
            if (!proyecto) {
                // si no existe el proyecto, mando error
                return res.status(404).json({ error: 'Proyecto no encontrado' });
            }

            // busco todas las imagenes de ese proyecto
            const galeria = await GaleriaProyectoRepository.obtenerPorProyectoId(id);

            // creo un array para mandar al frontend
            const galeriaJSON = [];
            
            // recorro todas las imagenes
            for (let i = 0; i < galeria.length; i++) {
                // convierto cada imagen a JSON
                const imagenJSON = galeria[i].convertirAJSON();
                // la agrego al array
                galeriaJSON.push(imagenJSON);
            }

            // mando la respuesta
            res.status(200).json(galeriaJSON);
        } catch (error) {
            // si hay error, lo imprimo
            console.error('Error al obtener galeria:', error);
            res.status(500).json({ error: 'Error interno del servidor al obtener galeria' });
        }
    }

    // funcion para agregar una nueva imagen a la galeria de un proyecto
    async crear(req, res) {
        try {
            // valido los datos que me mandaron
            const errores = validationResult(req);
            
            if (!errores.isEmpty()) {
                return res.status(400).json({ errors: errores.array() });
            }

            // obtengo los datos de la imagen
            const idProyecto = req.body.id_proyecto;
            const urlImagen = req.body.url_imagen;

            // verifico que el proyecto exista antes de agregar la imagen
            const proyecto = await ProyectoRepository.obtenerPorId(idProyecto);
            
            if (!proyecto) {
                // si el proyecto no existe, no puedo agregar la imagen
                return res.status(404).json({ 
                    error: 'El proyecto especificado no existe. No se puede agregar la imagen.' 
                });
            }

            // creo el objeto de galeria con los datos
            const datosImagen = {
                id_proyecto: idProyecto,
                url_imagen: urlImagen
            };
            const galeriaItem = new GaleriaProyecto(datosImagen);

            // valido que tenga un proyecto asociado
            if (!galeriaItem.tieneProyecto()) {
                return res.status(400).json({ error: 'ID de proyecto invalido' });
            }

            // guardo la imagen en la base de datos
            const imagenId = await GaleriaProyectoRepository.crear(galeriaItem);

            // mando respuesta exitosa
            res.status(201).json({
                mensaje: 'Imagen agregada a la galeria exitosamente',
                id: imagenId,
                id_proyecto: idProyecto,
                url_imagen: urlImagen
            });
        } catch (error) {
            // si hay error, lo imprimo
            console.error('Error al agregar imagen a galeria:', error);
            
            // verifico si el error es porque el proyecto no existe
            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(404).json({ 
                    error: 'El proyecto especificado no existe' 
                });
            }
            
            res.status(500).json({ error: 'Error interno del servidor al agregar imagen' });
        }
    }

    // funcion para eliminar una imagen de la galeria
    async eliminar(req, res) {
        try {
            // obtengo el id de la imagen
            const id = req.params.id;

            // valido el id
            if (!id) {
                return res.status(400).json({ error: 'ID de imagen invalido' });
            }
            
            if (isNaN(id)) {
                return res.status(400).json({ error: 'ID de imagen invalido' });
            }

            // elimino la imagen de la base de datos
            const eliminado = await GaleriaProyectoRepository.eliminar(id);

            // verifico si se elimino
            if (!eliminado) {
                // si no se elimino, es porque no existe
                return res.status(404).json({ error: 'Imagen no encontrada' });
            }

            // mando respuesta exitosa
            res.status(200).json({
                mensaje: 'Imagen eliminada de la galeria exitosamente'
            });
        } catch (error) {
            // si hay error, lo imprimo
            console.error('Error al eliminar imagen:', error);
            res.status(500).json({ error: 'Error interno del servidor al eliminar imagen' });
        }
    }
}

// exporto una instancia del controlador
export default new GaleriaProyectoController();
