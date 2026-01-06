import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { probarConexion } from './src/config/database.js';
import routes from './src/routes/index.js';

// configuro las variables de entorno del archivo .env
dotenv.config();

// creo la aplicacion express
const aplicacion = express();
const PUERTO = process.env.PORT || 8081;

// configuro los middlewares que necesita la aplicacion
aplicacion.use(cors()); // habilito CORS para que el frontend pueda hacer peticiones
aplicacion.use(express.json()); // para poder leer JSON en las peticiones
aplicacion.use(express.urlencoded({ extended: true })); // para poder leer datos de formularios

// middleware para mostrar las peticiones en la consola (solo en desarrollo)
if (process.env.NODE_ENV === 'development') {
    aplicacion.use((req, res, next) => {
        // imprimo la fecha, el metodo y la ruta de cada peticion
        console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
        next();
    });
}

// configuro las rutas principales de la API
aplicacion.use('/api/portafolio', routes);

// ruta raiz para verificar que el servidor esta funcionando
aplicacion.get('/', (req, res) => {
    // mando un mensaje de bienvenida con los endpoints disponibles
    res.json({ 
        message: 'Bienvenido a la API de PrysmaPH',
        version: '1.0.0',
        endpoints: {
            proyectos: '/api/portafolio/proyectos',
            galeria: '/api/portafolio/galeria',
            mensajes: '/api/portafolio/mensajes_contacto',
            fotografias: '/api/portafolio/fotografias',
            health: '/api/portafolio/health'
        }
    });
});

// middleware para rutas que no existen (error 404)
aplicacion.use((req, res) => {
    // si llego aqui es porque la ruta no existe
    res.status(404).json({ 
        error: 'Ruta no encontrada',
        path: req.path 
    });
});

// middleware para manejar errores globales
aplicacion.use((err, req, res, next) => {
    // imprimo el error en la consola
    console.error('Error no manejado:', err);
    
    // mando el error al cliente
    res.status(err.status || 500).json({
        error: err.message || 'Error interno del servidor',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// funcion para iniciar el servidor
async function iniciarServidor() {
    try {
        // primero pruebo la conexion a la base de datos
        console.log('🔌 Probando conexion a la base de datos...');
        const bdConectada = await probarConexion();
        
        // verifico si la base de datos se conecto bien
        if (!bdConectada) {
            // si no se conecto, muestro un aviso
            console.error('⚠️  No se pudo conectar a la base de datos. Verifica tu configuracion en .env');
            console.log('El servidor se iniciara de todos modos, pero las operaciones de base de datos fallaran.');
        }

        // inicio el servidor en el puerto configurado
        aplicacion.listen(PUERTO, () => {
            // imprimo informacion del servidor
            console.log('=====================================');
            console.log(`🚀 Servidor funcionando en el puerto ${PUERTO}`);
            console.log(`📍 URL: http://localhost:${PUERTO}`);
            console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
            console.log('=====================================');
            console.log('Endpoints disponibles:');
            console.log(`  - GET    /api/portafolio/proyectos`);
            console.log(`  - POST   /api/portafolio/proyectos`);
            console.log(`  - GET    /api/portafolio/proyectos/:id`);
            console.log(`  - PUT    /api/portafolio/proyectos/:id`);
            console.log(`  - DELETE /api/portafolio/proyectos/:id`);
            console.log(`  - GET    /api/portafolio/proyectos/:id/galeria`);
            console.log(`  - POST   /api/portafolio/galeria`);
            console.log(`  - DELETE /api/portafolio/galeria/:id`);
            console.log(`  - GET    /api/portafolio/mensajes_contacto`);
            console.log(`  - POST   /api/portafolio/mensajes_contacto`);
            console.log(`  - DELETE /api/portafolio/mensajes_contacto/:id`);
            console.log(`  - GET    /api/portafolio/fotografias`);
            console.log(`  - POST   /api/portafolio/fotografias`);
            console.log(`  - DELETE /api/portafolio/fotografias/:id`);
            console.log('=====================================');
        });
    } catch (error) {
        // si hay error al iniciar el servidor, lo imprimo
        console.error('❌ Error al iniciar el servidor:', error);
        // termino el proceso con error
        process.exit(1);
    }
}

// manejo las señales de terminacion para cerrar el servidor correctamente
process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM recibido. Cerrando servidor...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 SIGINT recibido. Cerrando servidor...');
    process.exit(0);
});

// inicio el servidor
iniciarServidor();

// exporto la aplicacion por si la necesito en otros archivos
export default aplicacion;
