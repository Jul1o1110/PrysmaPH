import poolConexion from '../config/database.js';
import GaleriaProyecto from '../models/GaleriaProyecto.js';

// repositorio para manejar las imagenes de la galeria de proyectos
// estas imagenes pertenecen a un proyecto especifico
class GaleriaProyectoRepository {
    // funcion para obtener todas las imagenes de un proyecto especifico
    async obtenerPorProyectoId(idProyecto) {
        // busco en la BD todas las imagenes de ese proyecto
        const [filas] = await poolConexion.execute(
            'SELECT * FROM galeria_proyectos WHERE id_proyecto = ?',
            [idProyecto]
        );
        
        // creo un array vacio para las imagenes
        const imagenes = [];
        
        // recorro todas las filas
        for (let i = 0; i < filas.length; i++) {
            // creo un objeto GaleriaProyecto por cada fila
            const imagen = new GaleriaProyecto(filas[i]);
            // lo agrego al array
            imagenes.push(imagen);
        }
        
        // retorno el array de imagenes
        return imagenes;
    }

    // funcion para agregar una nueva imagen a la galeria de un proyecto
    async crear(imagen) {
        // hago el INSERT en la BD con los datos de la imagen
        const [resultado] = await poolConexion.execute(
            'INSERT INTO galeria_proyectos (id_proyecto, url_imagen) VALUES (?, ?)',
            [imagen.idProyecto, imagen.urlImagen]
        );
        
        // retorno el id de la imagen que se creo
        return resultado.insertId;
    }

    // funcion para eliminar una imagen de la galeria
    async eliminar(id) {
        // ejecuto el DELETE en la BD
        const [resultado] = await poolConexion.execute('DELETE FROM galeria_proyectos WHERE id = ?', [id]);
        
        // verifico si se elimino algo
        if (resultado.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }

    // funcion para eliminar todas las imagenes de un proyecto
    async eliminarPorProyecto(idProyecto) {
        // ejecuto el DELETE de todas las imagenes de ese proyecto
        const [resultado] = await poolConexion.execute(
            'DELETE FROM galeria_proyectos WHERE id_proyecto = ?',
            [idProyecto]
        );
        
        // retorno cuantas filas se eliminaron
        return resultado.affectedRows;
    }
}

// exporto una instancia del repositorio
export default new GaleriaProyectoRepository();
