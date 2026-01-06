import { validationResult } from 'express-validator';
import ProyectoRepository from '../repositories/ProyectoRepository.js';
import Proyecto from '../models/Proyecto.js';

// controlador para manejar las peticiones de proyectos
// aqui estan todas las funciones que responden a las rutas de la API
class ProyectoController {
    // funcion para obtener todos los proyectos
    // tambien permite filtrar por categoria si se manda el parametro
    async obtenerTodos(req, res) {
        try {
            // obtengo la categoria del query string si existe
            const categoria = req.query.categoria;

            // declaro una variable para guardar los proyectos
            let proyectos;
            
            // verifico si me mandaron una categoria para filtrar
            if (categoria) {
                // valido que la categoria sea valida
                if (categoria === 'arquitectura') {
                    // si es arquitectura, esta bien
                    proyectos = await ProyectoRepository.obtenerPorCategoria(categoria);
                } else if (categoria === 'fotografia') {
                    // si es fotografia, tambien esta bien
                    proyectos = await ProyectoRepository.obtenerPorCategoria(categoria);
                } else {
                    // si no es ninguna de las dos, mando un error
                    return res.status(400).json({
                        error: 'Categoria invalida. Debe ser "arquitectura" o "fotografia"'
                    });
                }
            } else {
                // si no me mandaron categoria, traigo todos los proyectos
                proyectos = await ProyectoRepository.obtenerTodos();
            }

            // creo un array para mandar al frontend
            const proyectosJSON = [];
            
            // recorro todos los proyectos
            for (let i = 0; i < proyectos.length; i++) {
                // convierto cada proyecto a JSON
                const proyectoJSON = proyectos[i].convertirAJSON();
                // lo agrego al array
                proyectosJSON.push(proyectoJSON);
            }

            // mando la respuesta con los proyectos
            res.status(200).json(proyectosJSON);
        } catch (error) {
            // si hay un error, lo imprimo en la consola
            console.error('Error al obtener proyectos:', error);
            // mando un error al cliente
            res.status(500).json({ error: 'Error interno del servidor al obtener proyectos' });
        }
    }

    // funcion para obtener un proyecto por su id con su galeria
    async obtenerPorId(req, res) {
        try {
            // obtengo el id del proyecto de los parametros
            const id = req.params.id;

            // valido que el id sea valido
            if (!id) {
                // si no hay id, mando error
                return res.status(400).json({ error: 'ID de proyecto invalido' });
            }
            
            // valido que el id sea un numero
            if (isNaN(id)) {
                // si no es numero, mando error
                return res.status(400).json({ error: 'ID de proyecto invalido' });
            }

            // busco el proyecto en la base de datos con su galeria
            const proyecto = await ProyectoRepository.obtenerConGaleria(id);

            // verifico si encontre el proyecto
            if (!proyecto) {
                // si no lo encontre, mando error 404
                return res.status(404).json({ error: 'Proyecto no encontrado' });
            }

            // si lo encontre, lo mando como respuesta
            res.status(200).json(proyecto);
        } catch (error) {
            // si hay error, lo imprimo
            console.error('Error al obtener proyecto:', error);
            // mando error al cliente
            res.status(500).json({ error: 'Error interno del servidor al obtener proyecto' });
        }
    }

    // funcion para crear un nuevo proyecto
    async crear(req, res) {
        try {
            // valido los datos que me mandaron
            const errores = validationResult(req);
            
            // verifico si hay errores de validacion
            if (!errores.isEmpty()) {
                // si hay errores, los mando al cliente
                return res.status(400).json({ errors: errores.array() });
            }

            // creo un nuevo proyecto con los datos que me mandaron
            const proyecto = new Proyecto(req.body);

            // valido que la categoria sea correcta
            if (!proyecto.esCategoiaValida()) {
                // si la categoria no es valida, mando error
                return res.status(400).json({ 
                    error: 'Categoria invalida. Debe ser "arquitectura" o "fotografia"' 
                });
            }

            // guardo el proyecto en la base de datos
            const proyectoId = await ProyectoRepository.crear(proyecto);
            
            // busco el proyecto que acabo de crear para mandarlo completo
            const nuevoProyecto = await ProyectoRepository.obtenerPorId(proyectoId);

            // mando la respuesta con el proyecto creado
            res.status(201).json({
                mensaje: 'Proyecto creado exitosamente',
                proyecto: nuevoProyecto.convertirAJSON()
            });
        } catch (error) {
            // si hay error, lo imprimo
            console.error('Error al crear proyecto:', error);
            // mando error al cliente
            res.status(500).json({ error: 'Error interno del servidor al crear proyecto' });
        }
    }

    // funcion para actualizar un proyecto existente
    async actualizar(req, res) {
        try {
            // obtengo el id del proyecto
            const id = req.params.id;

            // valido que el id sea valido
            if (!id) {
                return res.status(400).json({ error: 'ID de proyecto invalido' });
            }
            
            if (isNaN(id)) {
                return res.status(400).json({ error: 'ID de proyecto invalido' });
            }

            // valido los datos que me mandaron
            const errores = validationResult(req);
            
            if (!errores.isEmpty()) {
                return res.status(400).json({ errors: errores.array() });
            }

            // verifico que el proyecto exista
            const proyectoExistente = await ProyectoRepository.obtenerPorId(id);
            
            if (!proyectoExistente) {
                // si no existe, mando error 404
                return res.status(404).json({ error: 'Proyecto no encontrado' });
            }

            // creo un proyecto con los datos existentes y los nuevos
            const datosExistentes = proyectoExistente.convertirAJSON();
            const datosNuevos = req.body;
            
            // combino los datos
            const datosCombinados = { ...datosExistentes, ...datosNuevos };
            const proyecto = new Proyecto(datosCombinados);

            // si me mandaron categoria, valido que sea correcta
            if (req.body.categoria) {
                if (!proyecto.esCategoiaValida()) {
                    return res.status(400).json({ 
                        error: 'Categoria invalida. Debe ser "arquitectura" o "fotografia"' 
                    });
                }
            }

            // actualizo el proyecto en la base de datos
            const actualizado = await ProyectoRepository.actualizar(id, proyecto);

            // verifico que se haya actualizado
            if (!actualizado) {
                return res.status(500).json({ error: 'No se pudo actualizar el proyecto' });
            }

            // busco el proyecto actualizado
            const proyectoActualizado = await ProyectoRepository.obtenerPorId(id);

            // mando la respuesta
            res.status(200).json({
                mensaje: 'Proyecto actualizado exitosamente',
                proyecto: proyectoActualizado.convertirAJSON()
            });
        } catch (error) {
            // si hay error, lo imprimo
            console.error('Error al actualizar proyecto:', error);
            res.status(500).json({ error: 'Error interno del servidor al actualizar proyecto' });
        }
    }

    // funcion para eliminar un proyecto
    // cuando se elimina un proyecto, tambien se elimina su galeria automaticamente
    async eliminar(req, res) {
        try {
            // obtengo el id del proyecto
            const id = req.params.id;

            // valido el id
            if (!id) {
                return res.status(400).json({ error: 'ID de proyecto invalido' });
            }
            
            if (isNaN(id)) {
                return res.status(400).json({ error: 'ID de proyecto invalido' });
            }

            // verifico que el proyecto exista
            const proyecto = await ProyectoRepository.obtenerPorId(id);
            
            if (!proyecto) {
                // si no existe, mando error
                return res.status(404).json({ error: 'Proyecto no encontrado' });
            }

            // elimino el proyecto
            const eliminado = await ProyectoRepository.eliminar(id);

            // verifico que se haya eliminado
            if (!eliminado) {
                return res.status(500).json({ error: 'No se pudo eliminar el proyecto' });
            }

            // mando respuesta exitosa
            res.status(200).json({
                mensaje: 'Proyecto y su galeria eliminados exitosamente'
            });
        } catch (error) {
            // si hay error, lo imprimo
            console.error('Error al eliminar proyecto:', error);
            res.status(500).json({ error: 'Error interno del servidor al eliminar proyecto' });
        }
    }
}

// exporto una instancia del controlador
export default new ProyectoController();
