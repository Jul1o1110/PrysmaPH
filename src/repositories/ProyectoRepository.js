import poolConexion from '../config/database.js';
import Proyecto from '../models/Proyecto.js';

// repositorio para manejar los proyectos en la base de datos
// aqui estan todas las funciones para crear, leer, actualizar y eliminar proyectos
class ProyectoRepository {
    // funcion para obtener todos los proyectos de la base de datos
    async obtenerTodos() {
        // hago la consulta a la base de datos y ordeno por fecha
        const [filas] = await poolConexion.execute('SELECT * FROM proyectos ORDER BY fecha_creacion DESC');
        
        // creo un array vacio para guardar los proyectos
        const proyectos = [];
        
        // recorro todas las filas que me devolvio la BD
        for (let i = 0; i < filas.length; i++) {
            // creo un nuevo proyecto con los datos de cada fila
            const proyecto = new Proyecto(filas[i]);
            // lo agrego al array
            proyectos.push(proyecto);
        }
        
        // retorno el array con todos los proyectos
        return proyectos;
    }

    // funcion para buscar un proyecto por su id
    async obtenerPorId(id) {
        // hago la consulta a la base de datos
        const [filas] = await poolConexion.execute('SELECT * FROM proyectos WHERE id = ?', [id]);
        
        // verifico si encontre resultados
        if (filas.length > 0) {
            // si encontre, creo un nuevo proyecto con los datos
            const proyecto = new Proyecto(filas[0]);
            return proyecto;
        } else {
            // si no encontre nada, retorno null
            return null;
        }
    }

    // funcion para obtener proyectos filtrados por categoria
    async obtenerPorCategoria(categoria) {
        // busco en la BD todos los proyectos de esa categoria
        const [filas] = await poolConexion.execute(
            'SELECT * FROM proyectos WHERE categoria = ? ORDER BY fecha_creacion DESC',
            [categoria]
        );
        
        // creo un array vacio para los proyectos
        const proyectos = [];
        
        // recorro todas las filas
        for (let i = 0; i < filas.length; i++) {
            // creo cada proyecto
            const proyecto = new Proyecto(filas[i]);
            // lo agrego al array
            proyectos.push(proyecto);
        }
        
        // retorno el array
        return proyectos;
    }

    // funcion para crear un nuevo proyecto en la base de datos
    async crear(proyecto) {
        // hago el INSERT en la BD con los datos del proyecto
        const [resultado] = await poolConexion.execute(
            'INSERT INTO proyectos (titulo, descripcion, imagen_principal, categoria) VALUES (?, ?, ?, ?)',
            [proyecto.titulo, proyecto.descripcion, proyecto.imagenPrincipal, proyecto.categoria]
        );
        
        // retorno el id del proyecto que se creo
        return resultado.insertId;
    }

    // funcion para actualizar un proyecto existente
    async actualizar(id, proyecto) {
        // hago el UPDATE en la BD
        const [resultado] = await poolConexion.execute(
            'UPDATE proyectos SET titulo = ?, descripcion = ?, imagen_principal = ?, categoria = ? WHERE id = ?',
            [proyecto.titulo, proyecto.descripcion, proyecto.imagenPrincipal, proyecto.categoria, id]
        );
        
        // verifico si se actualizo algo
        if (resultado.affectedRows > 0) {
            // si se actualizo, retorno true
            return true;
        } else {
            // si no se actualizo nada, retorno false
            return false;
        }
    }

    // funcion para eliminar un proyecto
    // cuando se elimina un proyecto, tambien se eliminan sus imagenes de galeria automaticamente
    async eliminar(id) {
        // ejecuto el DELETE en la BD
        const [resultado] = await poolConexion.execute('DELETE FROM proyectos WHERE id = ?', [id]);
        
        // verifico si se elimino algo
        if (resultado.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }

    // funcion para obtener un proyecto con todas sus imagenes de galeria
    async obtenerConGaleria(id) {
        // primero busco el proyecto
        const [filasProyecto] = await poolConexion.execute('SELECT * FROM proyectos WHERE id = ?', [id]);
        
        // verifico si encontre el proyecto
        if (filasProyecto.length === 0) {
            // si no lo encontre, retorno null
            return null;
        }

        // si lo encontre, creo el objeto proyecto
        const proyecto = new Proyecto(filasProyecto[0]);
        
        // ahora busco las imagenes de la galeria de ese proyecto
        const [filasGaleria] = await poolConexion.execute(
            'SELECT * FROM galeria_proyectos WHERE id_proyecto = ?',
            [id]
        );
        
        // creo un objeto con el proyecto y su galeria
        const proyectoConGaleria = {
            ...proyecto.convertirAJSON(), // uso convertirAJSON en lugar de toJSON
            galeria: filasGaleria
        };
        
        // retorno el proyecto con su galeria
        return proyectoConGaleria;
    }
}

// exporto una instancia del repositorio
export default new ProyectoRepository();
