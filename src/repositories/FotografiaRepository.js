import pool from '../config/database.js';
import Fotografia from '../models/Fotografia.js';

/**
 * Repositorio para operaciones de Fotografías
 */
class FotografiaRepository {
    /**
     * Obtener todas las fotografías
     */
    async findAll() {
        const [rows] = await pool.execute(
            'SELECT * FROM fotografias ORDER BY fecha_subida DESC'
        );
        return rows.map(row => new Fotografia(row));
    }

    /**
     * Filtrar fotografías por categoría
     */
    async findByCategoria(categoria) {
        const [rows] = await pool.execute(
            'SELECT * FROM fotografias WHERE categoria = ? ORDER BY fecha_subida DESC',
            [categoria]
        );
        return rows.map(row => new Fotografia(row));
    }

    /**
     * Crear nueva fotografía
     */
    async create(fotografia) {
        const [result] = await pool.execute(
            'INSERT INTO fotografias (url_imagen, categoria, alt_text) VALUES (?, ?, ?)',
            [fotografia.url_imagen, fotografia.categoria, fotografia.alt_text]
        );
        return result.insertId;
    }

    /**
     * Eliminar fotografía
     */
    async delete(id) {
        const [result] = await pool.execute('DELETE FROM fotografias WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

export default new FotografiaRepository();
