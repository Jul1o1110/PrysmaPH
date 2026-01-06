// este es el modelo para los proyectos del portafolio
// representa un proyecto que puede ser de arquitectura o fotografia
class Proyecto {
    constructor(data = {}) {
        // asigno los valores que recibo o valores por defecto
        this.id = data.id || null;
        this.titulo = data.titulo || '';
        this.descripcion = data.descripcion || null;
        this.imagenPrincipal = data.imagen_principal || ''; // uso imagenPrincipal en lugar de imagen_principal
        this.categoria = data.categoria || 'arquitectura'; // puede ser 'arquitectura' o 'fotografia'
        this.fechaCreacion = data.fecha_creacion || null; // uso fechaCreacion en lugar de fecha_creacion
    }

    // funcion para convertir el proyecto a JSON y enviarlo al frontend
    convertirAJSON() {
        // creo un objeto con todos los datos del proyecto
        const objetoJSON = {
            id: this.id,
            titulo: this.titulo,
            descripcion: this.descripcion,
            imagen_principal: this.imagenPrincipal, // mando imagen_principal para que el frontend lo entienda
            categoria: this.categoria,
            fecha_creacion: this.fechaCreacion // mando fecha_creacion para compatibilidad con la BD
        };
        
        // retorno el objeto
        return objetoJSON;
    }

    // funcion para validar que la categoria sea correcta
    esCategoiaValida() {
        // verifico si la categoria es una de las validas
        if (this.categoria === 'arquitectura') {
            // si es arquitectura, es valida
            return true;
        } else if (this.categoria === 'fotografia') {
            // si es fotografia, tambien es valida
            return true;
        } else {
            // si no es ninguna de las dos, no es valida
            return false;
        }
    }
}

export default Proyecto;
