// modelo para los mensajes de contacto que mandan los usuarios
// guarda la informacion de contacto y el mensaje
class MensajeContacto {
    constructor(data = {}) {
        // asigno los datos del mensaje
        this.id = data.id || null;
        this.nombre = data.nombre || '';
        this.email = data.email || '';
        this.telefono = data.telefono || null;
        this.mensaje = data.mensaje || '';
        this.fechaEnvio = data.fecha_envio || null; // cambio fecha_envio a fechaEnvio
    }

    // funcion para convertir el mensaje a JSON
    convertirAJSON() {
        // creo el objeto con los datos
        // importante: uso fechaEnvio con camelCase para el frontend
        const objetoJSON = {
            id: this.id,
            nombre: this.nombre,
            email: this.email,
            telefono: this.telefono,
            mensaje: this.mensaje,
            fechaEnvio: this.fechaEnvio // mando fechaEnvio para que el frontend lo entienda
        };
        
        // retorno el objeto
        return objetoJSON;
    }
}

export default MensajeContacto;
