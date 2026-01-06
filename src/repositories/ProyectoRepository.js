import pool from '../config/database.js';
import Proyecto from '../models/Proyecto.js';

/**
 * Repositorio para operaciones CRUD de Proyectos
 */
class ProyectoRepository {
    /**
     * Obtener todos los proyectos
     */
    async findAll() {
        const [rows] = await pool.execute('SELECT * FROM proyectos ORDER BY fecha_creacion DESC');
        return rows.map(row => new Proyecto(row));
    }

    /**
     * Obtener proyecto por ID
     */
    async findById(id) {
        const [rows] = await pool.execute('SELECT * FROM proyectos WHERE id = ?', [id]);
        return rows.length > 0 ? new Proyecto(rows[0]) : null;
    }

    /**
     * Filtrar proyectos por categoría
     */
    async findByCategoria(categoria) {
        const [rows] = await pool.execute(
            'SELECT * FROM proyectos WHERE categoria = ? ORDER BY fecha_creacion DESC',
            [categoria]
        );
        return rows.map(row => new Proyecto(row));
    }

    /**
     * Crear nuevo proyecto
     */
    async create(proyecto) {
        const [result] = await pool.execute(
            'INSERT INTO proyectos (titulo, descripcion, imagen_principal, categoria) VALUES (?, ?, ?, ?)',
            [proyecto.titulo, proyecto.descripcion, proyecto.imagen_principal, proyecto.categoria]
        );
        return result.insertId;
    }

    /**
     * Actualizar proyecto existente
     */
    async update(id, proyecto) {
        const [result] = await pool.execute(
            'UPDATE proyectos SET titulo = ?, descripcion = ?, imagen_principal = ?, categoria = ? WHERE id = ?',
            [proyecto.titulo, proyecto.descripcion, proyecto.imagen_principal, proyecto.categoria, id]
        );
        return result.affectedRows > 0;
    }

    /**
     * Eliminar proyecto (cascada automática a galería)
     */
    async delete(id) {
        const [result] = await pool.execute('DELETE FROM proyectos WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }

    /**
     * Obtener proyecto con todas sus imágenes de galería
     */
    async findWithGallery(id) {
        const [proyectoRows] = await pool.execute('SELECT * FROM proyectos WHERE id = ?', [id]);
        
        if (proyectoRows.length === 0) {
            return null;
        }

        const proyecto = new Proyecto(proyectoRows[0]);
        
        const [galeriaRows] = await pool.execute(
            'SELECT * FROM galeria_proyectos WHERE id_proyecto = ?',
            [id]
        );
        
        return {
            ...proyecto.toJSON(),
            galeria: galeriaRows
        };
    }
}

export default new ProyectoRepository();
