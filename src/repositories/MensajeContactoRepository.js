import poolConexion from '../config/database.js';
import MensajeContacto from '../models/MensajeContacto.js';

// repositorio para manejar los mensajes de contacto
// aqui se guardan todos los mensajes que envian los usuarios desde el formulario
class MensajeContactoRepository {
    // funcion para obtener todos los mensajes de la base de datos
    async obtenerTodos() {
        // busco todos los mensajes ordenados del mas reciente al mas viejo
        const [filas] = await poolConexion.execute(
            'SELECT * FROM mensajes_contacto ORDER BY fecha_envio DESC'
        );
        
        // creo un array vacio para guardar los mensajes
        const mensajes = [];
        
        // recorro todas las filas que me devolvio la BD
        for (let i = 0; i < filas.length; i++) {
            // creo un nuevo mensaje con los datos de cada fila
            const mensaje = new MensajeContacto(filas[i]);
            // lo agrego al array
            mensajes.push(mensaje);
        }
        
        // retorno el array con todos los mensajes
        return mensajes;
    }

    // funcion para buscar un mensaje por su id
    async obtenerPorId(id) {
        // hago la consulta a la base de datos
        const [filas] = await poolConexion.execute('SELECT * FROM mensajes_contacto WHERE id = ?', [id]);
        
        // verifico si encontre el mensaje
        if (filas.length > 0) {
            // si lo encontre, creo el objeto mensaje
            const mensaje = new MensajeContacto(filas[0]);
            return mensaje;
        } else {
            // si no lo encontre, retorno null
            return null;
        }
    }

    // funcion para crear un nuevo mensaje de contacto
    async crear(mensaje) {
        // hago el INSERT en la BD con los datos del mensaje
        // la fecha se pone automaticamente en la BD
        const [resultado] = await poolConexion.execute(
            'INSERT INTO mensajes_contacto (nombre, email, telefono, mensaje) VALUES (?, ?, ?, ?)',
            [mensaje.nombre, mensaje.email, mensaje.telefono, mensaje.mensaje]
        );
        
        // retorno el id del mensaje que se creo
        return resultado.insertId;
    }

    // funcion para eliminar un mensaje
    async eliminar(id) {
        // ejecuto el DELETE en la BD
        const [resultado] = await poolConexion.execute('DELETE FROM mensajes_contacto WHERE id = ?', [id]);
        
        // verifico si se elimino algo
        if (resultado.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }
}

// exporto una instancia del repositorio
export default new MensajeContactoRepository();
