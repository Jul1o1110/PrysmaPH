/**
 * Modelo de datos para Fotografia
 * Representa una fotografía independiente con categoría
 */
class Fotografia {
    constructor(data = {}) {
        this.id = data.id || null;
        this.url_imagen = data.url_imagen || '';
        this.categoria = data.categoria || '';
        this.alt_text = data.alt_text || null;
        this.fecha_subida = data.fecha_subida || null;
    }

    /**
     * Convierte el objeto a formato JSON para la API
     */
    toJSON() {
        return {
            id: this.id,
            url_imagen: this.url_imagen,
            categoria: this.categoria,
            alt_text: this.alt_text,
            fecha_subida: this.fecha_subida
        };
    }
}

export default Fotografia;
