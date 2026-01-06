import pool from '../config/database.js';
import GaleriaProyecto from '../models/GaleriaProyecto.js';

/**
 * Repositorio para operaciones de Galería de Proyectos
 */
class GaleriaProyectoRepository {
    /**
     * Obtener todas las imágenes de un proyecto
     */
    async findByProyectoId(idProyecto) {
        const [rows] = await pool.execute(
            'SELECT * FROM galeria_proyectos WHERE id_proyecto = ?',
            [idProyecto]
        );
        return rows.map(row => new GaleriaProyecto(row));
    }

    /**
     * Agregar imagen a galería
     */
    async create(imagen) {
        const [result] = await pool.execute(
            'INSERT INTO galeria_proyectos (id_proyecto, url_imagen) VALUES (?, ?)',
            [imagen.id_proyecto, imagen.url_imagen]
        );
        return result.insertId;
    }

    /**
     * Eliminar imagen de galería
     */
    async delete(id) {
        const [result] = await pool.execute('DELETE FROM galeria_proyectos WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }

    /**
     * Eliminar todas las imágenes de un proyecto
     */
    async deleteByProyecto(idProyecto) {
        const [result] = await pool.execute(
            'DELETE FROM galeria_proyectos WHERE id_proyecto = ?',
            [idProyecto]
        );
        return result.affectedRows;
    }
}

export default new GaleriaProyectoRepository();
