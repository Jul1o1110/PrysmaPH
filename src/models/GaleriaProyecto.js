// este es el modelo para las imagenes de la galeria de un proyecto
// cada imagen pertenece a un proyecto especifico
class GaleriaProyecto {
    constructor(data = {}) {
        // guardo los datos de la imagen
        this.id = data.id || null;
        this.idProyecto = data.id_proyecto || null; // cambio id_proyecto a idProyecto
        this.urlImagen = data.url_imagen || ''; // cambio url_imagen a urlImagen
    }

    // funcion para convertir a JSON y mandarlo al frontend
    convertirAJSON() {
        // creo el objeto con los datos
        const objeto = {
            id: this.id,
            id_proyecto: this.idProyecto, // mando id_proyecto para la BD
            url_imagen: this.urlImagen // mando url_imagen para la BD
        };
        
        // retorno el objeto
        return objeto;
    }

    // funcion para validar que la imagen tenga un proyecto asociado
    tieneProyecto() {
        // verifico si tiene un id de proyecto valido
        if (this.idProyecto !== null) {
            // si tiene un id, verifico que sea mayor a 0
            if (this.idProyecto > 0) {
                // si es mayor a 0, es valido
                return true;
            } else {
                // si no es mayor a 0, no es valido
                return false;
            }
        } else {
            // si no tiene id, no es valido
            return false;
        }
    }
}

export default GaleriaProyecto;
