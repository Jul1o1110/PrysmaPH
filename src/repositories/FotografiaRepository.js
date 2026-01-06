import poolConexion from '../config/database.js';
import Fotografia from '../models/Fotografia.js';

// repositorio para manejar las fotografias independientes
// estas son fotos que no pertenecen a ningun proyecto
class FotografiaRepository {
    // funcion para obtener todas las fotografias
    async obtenerTodas() {
        // busco todas las fotos ordenadas por fecha de mas reciente a mas vieja
        const [filas] = await poolConexion.execute(
            'SELECT * FROM fotografias ORDER BY fecha_subida DESC'
        );
        
        // creo un array vacio para las fotos
        const fotografias = [];
        
        // recorro todas las filas
        for (let i = 0; i < filas.length; i++) {
            // creo un objeto Fotografia por cada fila
            const foto = new Fotografia(filas[i]);
            // lo agrego al array
            fotografias.push(foto);
        }
        
        // retorno el array de fotografias
        return fotografias;
    }

    // funcion para obtener fotografias filtradas por categoria
    async obtenerPorCategoria(categoria) {
        // busco solo las fotos de esa categoria
        const [filas] = await poolConexion.execute(
            'SELECT * FROM fotografias WHERE categoria = ? ORDER BY fecha_subida DESC',
            [categoria]
        );
        
        // creo un array vacio
        const fotografias = [];
        
        // recorro las filas
        for (let i = 0; i < filas.length; i++) {
            // creo cada fotografia
            const foto = new Fotografia(filas[i]);
            // la agrego al array
            fotografias.push(foto);
        }
        
        // retorno el array
        return fotografias;
    }

    // funcion para crear una nueva fotografia
    async crear(fotografia) {
        // hago el INSERT en la BD
        // la fecha_subida se pone automaticamente
        const [resultado] = await poolConexion.execute(
            'INSERT INTO fotografias (url_imagen, categoria, alt_text) VALUES (?, ?, ?)',
            [fotografia.urlImagen, fotografia.categoria, fotografia.textoAlternativo]
        );
        
        // retorno el id de la foto que se creo
        return resultado.insertId;
    }

    // funcion para eliminar una fotografia
    async eliminar(id) {
        // ejecuto el DELETE en la BD
        const [resultado] = await poolConexion.execute('DELETE FROM fotografias WHERE id = ?', [id]);
        
        // verifico si se elimino algo
        if (resultado.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }
}

// exporto una instancia del repositorio
export default new FotografiaRepository();
