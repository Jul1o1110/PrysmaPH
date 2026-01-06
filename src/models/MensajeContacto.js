/**
 * Modelo de datos para MensajeContacto
 * Representa un mensaje de contacto enviado por un usuario
 */
class MensajeContacto {
    constructor(data = {}) {
        this.id = data.id || null;
        this.nombre = data.nombre || '';
        this.email = data.email || '';
        this.telefono = data.telefono || null;
        this.mensaje = data.mensaje || '';
        this.fecha_envio = data.fecha_envio || null;
    }

    /**
     * Convierte el objeto a formato JSON para la API
     */
    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            email: this.email,
            telefono: this.telefono,
            mensaje: this.mensaje,
            fechaEnvio: this.fecha_envio // Usando camelCase para el frontend
        };
    }
}

export default MensajeContacto;
