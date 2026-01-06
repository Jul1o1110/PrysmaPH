/**
 * Modelo de datos para GaleriaProyecto
 * Representa una imagen en la galería de un proyecto
 */
class GaleriaProyecto {
    constructor(data = {}) {
        this.id = data.id || null;
        this.id_proyecto = data.id_proyecto || null;
        this.url_imagen = data.url_imagen || '';
    }

    /**
     * Convierte el objeto a formato JSON para la API
     */
    toJSON() {
        return {
            id: this.id,
            id_proyecto: this.id_proyecto,
            url_imagen: this.url_imagen
        };
    }

    /**
     * Valida que tenga un proyecto asociado
     */
    hasProyecto() {
        return this.id_proyecto !== null && this.id_proyecto > 0;
    }
}

export default GaleriaProyecto;
