// modelo para las fotografias independientes del portafolio
// estas son fotos que no pertenecen a ningun proyecto en particular
class Fotografia {
    constructor(data = {}) {
        // guardo los datos de la fotografia
        this.id = data.id || null;
        this.urlImagen = data.url_imagen || ''; // cambio url_imagen a urlImagen
        this.categoria = data.categoria || '';
        this.textoAlternativo = data.alt_text || null; // cambio alt_text a textoAlternativo
        this.fechaSubida = data.fecha_subida || null; // cambio fecha_subida a fechaSubida
    }

    // funcion para convertir la fotografia a JSON
    convertirAJSON() {
        // creo el objeto con todos los datos
        const objeto = {
            id: this.id,
            url_imagen: this.urlImagen, // mando url_imagen para la BD
            categoria: this.categoria,
            alt_text: this.textoAlternativo, // mando alt_text para la BD
            fecha_subida: this.fechaSubida // mando fecha_subida para la BD
        };
        
        // retorno el objeto
        return objeto;
    }
}

export default Fotografia;
