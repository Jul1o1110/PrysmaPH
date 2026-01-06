/**
 * Modelo de datos para Proyecto
 * Representa la estructura de un proyecto de arquitectura o fotografía
 */
class Proyecto {
    constructor(data = {}) {
        this.id = data.id || null;
        this.titulo = data.titulo || '';
        this.descripcion = data.descripcion || null;
        this.imagen_principal = data.imagen_principal || '';
        this.categoria = data.categoria || 'arquitectura'; // 'arquitectura' o 'fotografia'
        this.fecha_creacion = data.fecha_creacion || null;
    }

    /**
     * Convierte el objeto a formato JSON para la API
     */
    toJSON() {
        return {
            id: this.id,
            titulo: this.titulo,
            descripcion: this.descripcion,
            imagen_principal: this.imagen_principal,
            categoria: this.categoria,
            fecha_creacion: this.fecha_creacion
        };
    }

    /**
     * Valida que la categoría sea válida
     */
    isValidCategoria() {
        return ['arquitectura', 'fotografia'].includes(this.categoria);
    }
}

export default Proyecto;
