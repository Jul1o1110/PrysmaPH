import pool from '../config/database.js';
import MensajeContacto from '../models/MensajeContacto.js';

/**
 * Repositorio para operaciones de Mensajes de Contacto
 */
class MensajeContactoRepository {
    /**
     * Obtener todos los mensajes
     */
    async findAll() {
        const [rows] = await pool.execute(
            'SELECT * FROM mensajes_contacto ORDER BY fecha_envio DESC'
        );
        return rows.map(row => new MensajeContacto(row));
    }

    /**
     * Obtener mensaje por ID
     */
    async findById(id) {
        const [rows] = await pool.execute('SELECT * FROM mensajes_contacto WHERE id = ?', [id]);
        return rows.length > 0 ? new MensajeContacto(rows[0]) : null;
    }

    /**
     * Crear nuevo mensaje de contacto
     */
    async create(mensaje) {
        const [result] = await pool.execute(
            'INSERT INTO mensajes_contacto (nombre, email, telefono, mensaje) VALUES (?, ?, ?, ?)',
            [mensaje.nombre, mensaje.email, mensaje.telefono, mensaje.mensaje]
        );
        return result.insertId;
    }

    /**
     * Eliminar mensaje
     */
    async delete(id) {
        const [result] = await pool.execute('DELETE FROM mensajes_contacto WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

export default new MensajeContactoRepository();
